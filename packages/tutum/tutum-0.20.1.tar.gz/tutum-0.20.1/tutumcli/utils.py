from __future__ import print_function
import datetime
import json
import urlparse
import ssl
import re
import os
import codecs
import sys

import requests
import yaml
import ago
import docker
import tutum
from dateutil import tz
from tabulate import tabulate
from tutum import ObjectNotFound

from exceptions import BadParameter, DockerNotFound, StreamOutputError
from . import __version__


def tabulate_result(data_list, headers):
    print(tabulate(data_list, headers, stralign="left", tablefmt="plain"))


def from_utc_string_to_utc_datetime(utc_datetime_string):
    if not utc_datetime_string:
        return None
    utc_date_object = datetime.datetime.strptime(utc_datetime_string, "%a, %d %b %Y %H:%M:%S +0000")

    return utc_date_object


def get_humanize_local_datetime_from_utc_datetime_string(utc_datetime_string):
    def get_humanize_local_datetime_from_utc_datetime(utc_target_datetime):
        local_now = datetime.datetime.now(tz.tzlocal())
        if utc_target_datetime:
            local_target_datetime = utc_target_datetime.replace(tzinfo=tz.gettz("UTC")).astimezone(tz=tz.tzlocal())
            return ago.human(local_now - local_target_datetime, precision=1)
        return ""

    utc_target_datetime = from_utc_string_to_utc_datetime(utc_datetime_string)
    return get_humanize_local_datetime_from_utc_datetime(utc_target_datetime)


def is_uuid4(identifier):
    uuid4_regexp = re.compile('^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}', re.I)
    match = uuid4_regexp.match(identifier)
    return bool(match)


def add_unicode_symbol_to_state(state):
    if state in ["Running", "Partly running", "Deployed"]:
        return u"\u25B6 " + state
    elif state in ["Init", "Stopped", "Not running"]:
        return u"\u25FC " + state
    elif state in ["Starting", "Stopping", "Scaling", "Terminating", "Deploying", "Redeploying"]:
        return u"\u2699 " + state
    elif state in ["Start failed", "Stopped with errors"]:
        return u"\u0021 " + state
    elif state == "Terminated":
        return u"\u2718 " + state
    elif state == "Unreachable":
        return u"\u2753 " + state
    return state


def get_docker_client():
    try:
        DOCKER_TLS_VERIFY = bool(os.environ.get('DOCKER_TLS_VERIFY', False))

        if not DOCKER_TLS_VERIFY:
            tls_config = False
        else:
            cert_path = os.environ.get('DOCKER_CERT_PATH')
            if cert_path:
                ca_cert_path = os.path.join(cert_path, "ca.pem")
                client_cert = (os.path.join(cert_path, "cert.pem"), os.path.join(cert_path, "key.pem"))
                tls_config = docker.tls.TLSConfig(
                    ssl_version=ssl.PROTOCOL_TLSv1,
                    client_cert=client_cert,
                    verify=ca_cert_path,
                    assert_hostname=False)
            else:
                tls_config = False

        base_url = os.getenv("DOCKER_HOST", None)
        if tls_config and base_url.startswith("tcp://"):
            base_url = base_url.replace("tcp://", "https://")

        docker_client = docker.Client(base_url=base_url, tls=tls_config, version='auto')
        docker_client.version()
        return docker_client
    except Exception:
        raise DockerNotFound("Cannot connect to docker (is it running?)")


def stream_output(output, stream):
    def print_output_event(event, stream, is_terminal):
        if 'errorDetail' in event:
            raise StreamOutputError(event['errorDetail']['message'])

        terminator = ''

        if is_terminal and 'stream' not in event:
            # erase current line
            stream.write("%c[2K\r" % 27)
            terminator = "\r"
            pass
        elif 'progressDetail' in event:
            return

        if 'time' in event:
            stream.write("[%s] " % event['time'])

        if 'id' in event:
            stream.write("%s: " % event['id'])

        if 'from' in event:
            stream.write("(from %s) " % event['from'])

        status = event.get('status', '')

        if 'progress' in event:
            stream.write("%s %s%s" % (status, event['progress'], terminator))
        elif 'progressDetail' in event:
            detail = event['progressDetail']
            if 'current' in detail:
                percentage = float(detail['current']) / float(detail['total']) * 100
                stream.write('%s (%.1f%%)%s' % (status, percentage, terminator))
            else:
                stream.write('%s%s' % (status, terminator))
        elif 'stream' in event:
            stream.write("%s%s" % (event['stream'], terminator))
        else:
            stream.write("%s%s\n" % (status, terminator))

    is_terminal = hasattr(stream, 'fileno') and os.isatty(stream.fileno())
    stream = codecs.getwriter('utf-8')(stream)
    all_events = []
    lines = {}
    diff = 0

    for chunk in output:
        event = json.loads(chunk)
        all_events.append(event)

        if 'progress' in event or 'progressDetail' in event:
            image_id = event.get('id')
            if not image_id:
                continue

            if image_id in lines:
                diff = len(lines) - lines[image_id]
            else:
                lines[image_id] = len(lines)
                stream.write("\n")
                diff = 0

            if is_terminal:
                # move cursor up `diff` rows
                stream.write("%c[%dA" % (27, diff))

        print_output_event(event, stream, is_terminal)

        if 'id' in event and is_terminal:
            # move cursor back down
            stream.write("%c[%dB" % (27, diff))

        stream.flush()

    return all_events


def get_uuids_of_trigger(trigger, identifiers):
    uuid_list = []
    for identifier in identifiers:
        if is_uuid4(identifier):
            uuid_list.append(identifier)
        else:
            handlers = trigger.list(uuid__startswith=identifier) or \
                       trigger.list(name=identifier)
            for handler in handlers:
                uuid = handler.get('uuid', "")
                if uuid:
                    uuid_list.append(uuid)
    if not uuid_list:
        raise ObjectNotFound("Cannot find a trigger with the identifier '%s'" % identifiers)
    return uuid_list


def parse_links(links, target):
    def _format_link(_link):
        link_regexp = re.compile(r'^[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)?:[a-zA-Z0-9_-]+$')
        match = link_regexp.match(_link)
        if match:
            temp = _link.split(":", 1)
            return {target: temp[0], 'name': temp[1]}
        raise BadParameter("Link variable argument %s does not match with (service_name[.stack_name]:alias)."
                           " Example: mysql:db" % _link)

    return [_format_link(link) for link in links] if links else []


def parse_published_ports(port_list):
    def _get_port_dict(_port):
        port_regexp = re.compile('^([0-9]{1,5}:)?([0-9]{1,5})(/tcp|/udp)?$')
        match = port_regexp.match(_port)
        if bool(match):
            outer_port = match.group(1)
            inner_port = match.group(2)
            protocol = match.group(3)
            if protocol is None:
                protocol = "tcp"
            else:
                protocol = protocol[1:]

            port_spec = {'protocol': protocol, 'inner_port': inner_port, 'published': True}

            if outer_port is not None:
                port_spec['outer_port'] = outer_port[:-1]
            return port_spec
        raise BadParameter("publish port %s does not match with '[host_port:]container_port[/protocol]'."
                           " E.g: 80:80/tcp" % _port)

    parsed_ports = []
    if port_list is not None:
        parsed_ports = []
        for port in port_list:
            parsed_ports.append(_get_port_dict(port))
    return parsed_ports


def parse_exposed_ports(port_list):
    def _get_port_dict(_port):
        if isinstance(_port, int) and 0 <= _port < 65535:
            port_spec = {'protocol': 'tcp', 'inner_port': '%d' % _port, 'published': False}
            return port_spec
        raise BadParameter("expose port %s is not a valid port number" % _port)

    parsed_ports = []
    if port_list is not None:
        parsed_ports = []
        for port in port_list:
            parsed_ports.append(_get_port_dict(port))
    return parsed_ports


def parse_envvars(envvar_list, envfile_list):
    def _transform_envvar(_envvar):
        _envvar = _envvar.split("=", 1)
        length = len(_envvar)
        if length == 2:
            return {'key': _envvar[0], 'value': _envvar[1]}
        else:
            raise BadParameter("Environment variable '%s' does not match with 'KEY=VALUE'."
                               " Example: ENVVAR=foo" % _envvar[0])

    def _read_envvar(envfile):
        envvars = []
        with open(envfile) as f:
            lines = f.readlines()
            for line in lines:
                line = line.strip()
                if line.startswith("#"):
                    continue
                if line == "":
                    continue
                envvars.append(line)
            return envvars

    transformed_envvars = []
    envvars = []
    if envfile_list is not None:
        for envfile in envfile_list:
            envvars.extend(_read_envvar(envfile))

    if envvar_list is not None:
        envvars.extend(envvar_list)

    if envvars is not None:
        for envvar in envvars:
            transformed_envvars.append(_transform_envvar(envvar))

    parsed_envvar_dict = {}
    parsed_envvar_list = []
    for transformed_envvar in transformed_envvars:
        parsed_envvar_dict[transformed_envvar["key"]] = transformed_envvar
    for v in parsed_envvar_dict.itervalues():
        parsed_envvar_list.append(v)

    return parsed_envvar_list


def try_register(username, password, email):
    if not email:
        email = raw_input("Email: ")

    headers = {"Content-Type": "application/json", "User-Agent": "tutum/%s" % __version__}
    data = {'username': username, "password1": password, "password2": password, "email": email}

    try:
        r = requests.post(urlparse.urljoin(tutum.base_url, "register/"), data=json.dumps(data), headers=headers)
        if r.status_code == 201:
            return True, "Account created. Please check your email for activation instructions."
        elif r.status_code == 429:
            return False, "Too many retries. Please login again later."
        else:
            messages = r.json()['register']
            if isinstance(messages, dict):
                _text = []
                for key in messages.keys():
                    _text.append("%s: %s" % (key, '\n'.join(messages[key])))
                _text = '\n'.join(_text)
            else:
                _text = messages
            return False, _text
    except Exception:
        return False, r.text


def parse_volume(volume):
    bindings = []
    if not volume:
        return bindings

    for vol in volume:
        binding = {}
        terms = vol.split(":")
        if len(terms) == 1:
            binding["container_path"] = terms[0]
        elif len(terms) == 2:
            binding["host_path"] = terms[0]
            binding["container_path"] = terms[1]
        elif len(terms) == 3:
            binding["host_path"] = terms[0]
            binding["container_path"] = terms[1]
            if terms[2].lower() == 'ro':
                binding["rewritable"] = False
        else:
            raise BadParameter('Bad volume argument %s. Format: "[host_path:]/container_path[:permission]"' % vol)
        bindings.append(binding)
    return bindings


def parse_volumes_from(volumes_from):
    bindings = []
    if not volumes_from:
        return bindings

    for identifier in volumes_from:
        binding = {}
        service = tutum.Utils.fetch_remote_service(identifier)
        binding["volumes_from"] = service.resource_uri
        bindings.append(binding)
    return bindings


def load_stack_file(name, stackfile, stack=None):
    if not stack:
        stack = tutum.Stack.create()
    else:
        name = stack.name

    if not stackfile:
        filematch = 0
        if os.path.exists("tutum.yml"):
            stackfile = "tutum.yml"
            filematch += 1
        if os.path.exists("tutum.yaml"):
            stackfile = "tutum.yaml"
            filematch += 1
        if os.path.exists("tutum.json"):
            stackfile = "tutum.json"
            filematch += 1
        if filematch == 0:
            raise BadParameter("Cannot find stack file. Are you in the right directory?")
        elif filematch > 1:
            raise BadParameter("More than one stack file was found in the path. "
                               "Please specify which one you'd like to use with -f <filename>")
    with open(stackfile, 'r') as f:
        content = yaml.load(f.read())
        services = []
        if content:
            for k, v in content.items():
                v.update({"name": k})
                services.append(v)

            if not name:
                name = os.path.basename(os.getcwd())

            services = inject_env_var(services)
            data = {'name': name, 'services': services}
            for k, v in list(data.items()):
                setattr(stack, k, v)
        else:
            raise BadParameter("Bad format of the stack file: %s" % stackfile)

    return stack


def inject_env_var(services):
    for service in services:
        try:
            env_vars = service["environment"]
        except:
            continue

        if isinstance(env_vars, list):
            for i, env_var in enumerate(env_vars):
                if isinstance(env_var, str) and env_var.find("=") < 0 and os.getenv(env_var):
                    env_vars[i] = "%s=%s" % (env_var, os.getenv(env_var))
        elif isinstance(env_vars, dict):
            for k, v in env_vars.iteritems():
                if not v and os.getenv(k):
                    env_vars[k] = os.getenv(k)

    return services


# def sync_action(obj, sync):
#     action_uri = getattr(obj, "tutum_action_uri", "")
#     if sync and action_uri:
#         action = tutum.Utils.fetch_by_resource_uri(action_uri)
#         action.logs(tail=None, follow=True, log_handler=action_log_handler)

def sync_action(obj, sync):
    import time

    action_uri = getattr(obj, "tutum_action_uri", "")
    if sync and action_uri:
        last_state = None
        while True:
            try:
                action = tutum.Utils.fetch_by_resource_uri(action_uri)
                if last_state != action.state:
                    if last_state:
                        sys.stdout.write('\n')
                    sys.stdout.write(action.state)
                    last_state = action.state
                else:
                    sys.stdout.write('.')
                if action.state.lower() == "success" or action.state.lower() == "failed":
                    sys.stdout.write('\n')
                    break
                sys.stdout.flush()
                time.sleep(4)
            except tutum.TutumApiError as e:
                print(e, file=sys.stderr)
                continue
            except Exception as e:
                print(e, file=sys.stderr)
                break


def container_service_log_handler(message):
    try:
        msg = json.loads(message)
        out = sys.stdout
        if msg.get("streamType", None) == "stderr":
            out = sys.stderr

        log = msg["log"]
        source = msg.get("source", None)
        if source:
            log = " | ".join([source, log])
            if os.isatty(out.fileno()):
                log = AnsiColor.color_it(log, source)
        out.write(log)
        out.flush()
    except:
        pass


def action_log_handler(message):
    try:
        msg = json.loads(message)
        if msg.get("type") == "log":
            print(msg.get("log", ""))
    except:
        pass


class AnsiColor:
    source_identified = []

    @staticmethod
    def color_it(log, source):
        if source not in AnsiColor.source_identified:
            AnsiColor.source_identified.append(source)

        color_index = AnsiColor.source_identified.index(source) % 7
        seq = "\x1b[1;%dm%s\x1b[0m" % (31 + color_index, log)
        return seq
