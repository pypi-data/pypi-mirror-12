import os
import sys
import re
import shutil
import time
import subprocess
from xtermcolor import colorize
import argparse
import json
import tempfile
import requests
from oauth2client.client import GoogleCredentials
import httplib2
try:
    from urllib.parse import urlparse
except:
    from urlparse import urlparse

cromwell_git = 'https://github.com/broadinstitute/cromwell.git'
cromtool_root = os.path.expanduser('~/.cromtool')
build_root = os.path.join(cromtool_root, 'build')
tmp_root = os.path.join(cromtool_root, 'tmp')
application_conf_file = os.path.join(cromtool_root, 'application.conf')
cromtool_conf_file = os.path.join(cromtool_root, 'config')
verbose = False

####
# Initial setup
####

for directory in [cromtool_root, build_root, tmp_root]:
    if not os.path.isdir(directory):
        print("Initializing {}...".format(directory))
        os.makedirs(directory)

if not os.path.isfile(cromtool_conf_file):
    default_conf = {
        "servers": {
            "local": {
                "host": "localhost",
                "port": 8000,
                "protocol": "http"
            },
            "dsde-dev": {
                "host": "cromwell.dsde-dev.broadinstitute.org",
                "port": 443,
                "protocol": "https"
            },
            "dsde-staging": {
                "host": "cromwell.dsde-staging.broadinstitute.org",
                "port": 443,
                "protocol": "https"
            }
        },
        "environments": {
          "dsde-dev": {
            "mysql_user": "",
            "mysql_password": ""
          },
          "dsde-staging": {
            "mysql_user": "",
            "mysql_password": ""
          }
        }
    }

    print("Writing default config to {}".format(cromtool_conf_file))
    with open(cromtool_conf_file, 'w') as fp:
        fp.write(json.dumps(default_conf, indent=4))

    print("\n======================================")
    print("A default configuration file has been written to {conf}".format(conf=cromtool_conf_file))
    print("")
    print("Please modify this file and put in values for username and passwords")
    print("======================================")
    sys.exit(0)

####
# Utility functions: running subcommands, running Cromwell locally and remotely, etc
####

def run(command, cwd=None, screen=True):
    print("> {}".format(colorize(command, ansi=3)))
    sys.stdout.flush()
    proc = subprocess.Popen(
        command,
        shell=True,
        universal_newlines=True,
        stdout=sys.stdout if screen else subprocess.PIPE,
        stderr=sys.stderr if screen else subprocess.PIPE,
        close_fds=True,
        cwd=cwd
    )
    stdout, stderr = proc.communicate()
    return (proc.returncode, stdout.strip(' \n') if stdout else '', stderr.strip(' \n') if stderr else '')

def find(name, path):
    for root, dirs, files in os.walk(path):
        for f in files:
            if re.match(name, f):
                return os.path.join(root, f)

def run_local(jar, wdl_file, inputs_file, options_file, config=None):
    config_flag = '-Dconfig.file={} '.format(config) if config else ''
    run('java {}-jar {} run {} {} {}'.format(config_flag, jar, wdl_file, inputs_file, options_file), screen=True)

def google_credentials():
    credentials = GoogleCredentials.get_application_default()
    http = httplib2.Http()
    credentials._refresh(http.request)
    return credentials

def google_authorization_token():
    return google_credentials().access_token

def google_refresh_token():
    return google_credentials().refresh_token

def vprint(msg):
    if verbose:
        print('> {}'.format(msg))

def pretty_request(req):
    return '{} {}\n{}\n\n{}'.format(
        req.method,
        req.url,
        '\n'.join('{}: {}'.format(k, v) for k, v in req.headers.items()),
        req.body.decode('utf-8') if req.body else '',
    ).strip('\n')

def pretty_response(res):
    return '{} {}\n{}\n\n{}'.format(
        res.status_code,
        res.reason,
        '\n'.join('{}: {}'.format(k, v) for k, v in res.headers.items()),
        res.content.decode('utf-8'),
    ).strip('\n')

def http_request(method, url, headers={}, files={}, debug=True):
    req = requests.Request(method, url, headers=headers, files=files)
    req_prepared = req.prepare()
    if debug:
        print(colorize(pretty_request(req_prepared), ansi=6) + '\n')
    session = requests.Session()
    response = session.send(req_prepared, timeout=30)
    if debug:
        print(colorize(pretty_response(response), ansi=7) + '\n')
    return response

def run_client(url, wdl_file, inputs_file, options_file, poll=False, dry_run=False):

    with open(wdl_file) as fp:
      wdl_source = fp.read()

    inputs = '{}' if inputs_file == '-' else open(inputs_file).read()
    options = '{}' if options_file == '-' else open(options_file).read()
    auth_token = google_authorization_token()

    files = {
      'wdlSource': wdl_source,
      'workflowInputs': inputs,
      'workflowOptions': options,
    }

    headers = {
        'Authorization': 'Bearer {}'.format(auth_token)
    }

    api_url = url + '/api/workflows/v1'
    httpie_command = "http --print=hbHB --form POST '{url}' wdlSource=@{wdl_file} {inputs_file} {options_file} 'Authorization: Bearer {auth_token}' ".format(
        url=api_url,
        wdl_file=wdl_file,
        inputs_file=('' if inputs_file == '-' else 'workflowInputs@'+inputs_file),
        options_file=('' if options_file == '-' else 'workflowOptions@'+options_file),
        auth_token=auth_token
    )

    vprint(httpie_command)
    if dry_run:
        print(httpie_command)
        return

    response = http_request('POST', api_url, headers=headers, files=files)
    workflow_id = response.json()['id']

    if poll:
        while True:
            time.sleep(5)
            response = http_request('GET', '{api_url}/{uuid}/status'.format(api_url=api_url, uuid=workflow_id), headers=headers)
            if response.json()['status'] in ['Succeeded', 'Failed', 'Aborted']:
                break

        http_request('GET', '{api_url}/{uuid}/outputs'.format(api_url=api_url, uuid=workflow_id), headers=headers)
        http_request('GET', '{api_url}/{uuid}/logs'.format(api_url=api_url, uuid=workflow_id), headers=headers)

    return workflow_id

####
# Main command line interface
####

def cli():
    command_help = {
      "server": "add/remove/list servers",
      "server-add": "add a Cromwell server",
      "server-rm": "remove a Cromwell server",
      "server-ls": "list all Cromwell servers",
      "mysql": "Get MySQL connection string based on --env={dsde-dev,dsde-staging}",
      "build": "add/list builds",
      "build-add": "create a new build",
      "build-ls": "list all builds",
      "run": "run a WDL file, locally or remotely via --server",
      "query": "Get HTTPie commands to query this workflow",
      "status": "Get the status of a remote workflow in tabular form",
      "access-token": "Acquire an Google authorization token",
      "refresh-token": "Acquire a Google refresh token token",
      "jes-instances": "Show Google VMs that are being used for JES jobs",
      "jes-job": "Show data about JES job"
    }

    parser = argparse.ArgumentParser(description='cromtool - a tool for working with Cromwell')
    parser.add_argument('-v', '--verbose', action='store_true', help='Print out more stuff')
    subparsers = parser.add_subparsers(help='Cromtool Actions', dest='action')
    subparsers.required = True
    commands = {}

    commands['server'] = subparsers.add_parser('server', description=command_help['server'], help=command_help['server'])
    server_subparsers = commands['server'].add_subparsers(help='Server sub-command', dest='server_action')
    server_subparsers.required = True
    commands['server-add'] = server_subparsers.add_parser('add', description=command_help['server-add'], help=command_help['server-add'])
    commands['server-add'].add_argument('name', help='Server name')
    commands['server-add'].add_argument('url', help='Cromwell server URL')
    commands['server-rm'] = server_subparsers.add_parser('rm', description=command_help['server-rm'], help=command_help['server-rm'])
    commands['server-rm'].add_argument('name', help='Server name')
    commands['server-ls'] = server_subparsers.add_parser('ls', description=command_help['server-ls'], help=command_help['server-ls'])

    commands['mysql'] = subparsers.add_parser('mysql', description=command_help['mysql'], help=command_help['mysql'])
    commands['mysql'].add_argument('--env', required=True, help='Environment (dsde-dev, dsde-staging)')

    commands['access-token'] = subparsers.add_parser('access-token', description=command_help['access-token'], help=command_help['access-token'])
    commands['refresh-token'] = subparsers.add_parser('refresh-token', description=command_help['refresh-token'], help=command_help['refresh-token'])

    commands['run'] = subparsers.add_parser('run', description=command_help['run'], help=command_help['run'])
    commands['run'].add_argument('--server', help='Cromwell server to issue command to')
    commands['run'].add_argument('--poll', action='store_true', help='Poll for completion after workflow is submitted, if submitted via --server')
    commands['run'].add_argument('--dry', action='store_true', help='Don\'t issue HTTP requests, print out command lines that will issue the HTTP request instead')
    commands['run'].add_argument('--wdl', help='WDL file path')
    commands['run'].add_argument('--inputs', default='-', help='Inputs JSON file path')
    commands['run'].add_argument('--options', default='-', help='Workflow options JSON file path')
    commands['run'].add_argument('--prefix', help='An alternative to --wdl,--inputs,--options')
    commands['run'].add_argument('--config', help='Path to an application.conf file to run (ignored with --server)')
    commands['run'].add_argument('--build', help='Name of build (reference to compiled JAR) to use')
    commands['run'].add_argument('--submissions', default='1', help='Submit the same workflow more than once')

    commands['build'] = subparsers.add_parser('build', description=command_help['build'], help=command_help['build'])
    build_subparsers = commands['build'].add_subparsers(help='Build sub-command', dest='build_action')
    build_subparsers.required = True
    commands['build-add'] = build_subparsers.add_parser('add', description=command_help['build-add'], help=command_help['build-add'])
    commands['build-add'].add_argument('--name', help='Name of this build which defaults to the git_ref')
    commands['build-add'].add_argument('git_ref', help='Git ref to build from')
    commands['build-ls'] = build_subparsers.add_parser('ls', description=command_help['build-ls'], help=command_help['build-ls'])

    commands['query'] = subparsers.add_parser('query', description=command_help['query'], help=command_help['query'])
    commands['query'].add_argument('--server', required=True, help='Cromwell server to issue command to')
    commands['query'].add_argument('workflow_id', help='Workflow ID to query')

    commands['status'] = subparsers.add_parser('status', description=command_help['status'], help=command_help['status'])
    commands['status'].add_argument('--server', required=True, help='Cromwell server to issue command to')
    commands['status'].add_argument('workflow_id', help='Workflow ID to query')

    commands['jes-instances'] = subparsers.add_parser('jes-instances', description=command_help['jes-instances'], help=command_help['jes-instances'])
    commands['jes-instances'].add_argument('--project', help='Specify the Google project')

    commands['jes-job'] = subparsers.add_parser('jes-job', description=command_help['jes-job'], help=command_help['jes-job'])
    commands['jes-job'].add_argument('id', help='Pipeline ID or operations ID')
    commands['jes-job'].add_argument('--project', help='Specify the Google project')
    cli = parser.parse_args()

    global verbose
    verbose = cli.verbose

    def get_server_by_name(name):
        if name not in conf['servers']:
            sys.stderr.write('server {} not found'.format(name))
            sys.exit(1)
        sv = conf['servers'][name]
        return '{}://{}:{}'.format(sv['protocol'], sv['host'], sv['port'])

    def md_table(table, header):
        max_len = 128
        col_size = [len(x) for x in header]
        def trunc(s):
            return s[:max_len-3] + '...' if len(s) >= max_len else s
        for row in table:
            for index, cell in enumerate(row):
                if len(str(cell)) > col_size[index]:
                    col_size[index] = min(len(str(cell)), max_len)
        def make_row(row):
            return '|{}|'.format('|'.join([trunc(str(x)).ljust(col_size[i]) if x is not None else ' ' * col_size[i] for i,x in enumerate(row)]))
        r = make_row(header) + '\n'
        r += '|{}|'.format('|'.join(['-' * col_size[i] for i,x in enumerate(col_size)])) + '\n'
        r += '\n'.join([make_row(x) for x in table])
        return r

    with open(cromtool_conf_file) as fp:
        conf = json.loads(fp.read())

    if cli.action == 'access-token':
        print(google_authorization_token())

    if cli.action == 'refresh-token':
        print(google_refresh_token())

    if cli.action == 'jes-instances':
        (rc, stdout, stderr) = run('gcloud compute {}instances list --format json'.format('' if cli.project is None else '--project='+cli.project+' '), screen=False)
        rows = []
        for instance in json.loads(stdout):
            if 'description' in instance:
                match = re.match(r'^Pipeline: (\d+) (?:Run|Operation): (.*)$', instance['description'])
                if match:
                    pipeline_id = match.group(1)
                    run_id = match.group(2)
                    machine_type = instance['machineType']
                    name = instance['name']
                    zone = instance['zone']
                    status = instance['status']
                    rows.append([name, pipeline_id, run_id, machine_type, status, 'gcloud compute ssh --zone={} {}'.format(zone, name)])
        print(md_table(rows, ['Name', 'Pipeline ID', 'Run ID', 'Machine Type', 'Status', 'gcloud']))

    if cli.action == 'jes-job':
        id = cli.id
        if id.startswith('operations/'): id = id.replace('operations/', '')

        (rc, stdout, stderr) = run('gcloud compute {}instances list --format json'.format('' if cli.project is None else '--project='+cli.project+' '), screen=False)
        rows = []
        pipeline_id = run_id = None
        for instance in json.loads(stdout):
            if 'description' in instance:
                match = re.match(r'^Pipeline: (\d+) (?:Run|Operation): (.*)$', instance['description'])
                if match and (match.group(1) == id or match.group(2) == id):
                    pipeline_id = match.group(1)
                    run_id = match.group(2)
                    ssh = 'gcloud compute ssh --zone={} {}'.format(instance['zone'], instance['name'])
                    break
        if pipeline_id is None or run_id is None:
            sys.stderr.write("Could not find any running instances for {}\n".format(cli.id))
            sys.exit(1)

        print("")
        print("{}: {}".format(colorize("Pipeline ID", ansi=1), pipeline_id))
        print("{}: {}".format(colorize("Run ID", ansi=1), run_id))
        print("{}: {}".format(colorize("SSH", ansi=1), ssh))
        print("")

        (rc, stdout, stderr) = run('{} sudo "docker ps"'.format(ssh), screen=False)
        print(stdout)
        print("")

        for line in stdout.split('\n'):
            line = line.strip()
            if len(line) == 0 or 'Warning: Permanently added' in line or 'CONTAINER ID' in line:
                continue
            container_id = line.split(' ')[0]
            print("{}: sudo docker exec -t -i {} bash -l".format(colorize("Docker exec", ansi=1), container_id))
        print("")

        (rc, stdout, stderr) = run('{} "sudo df -h"'.format(ssh))
        print(stdout)

        (rc, stdout, stderr) = run('{} "sudo apt-get -qq install tree && tree -h /mnt/local-disk"'.format(ssh))
        print(stdout)

        sys.exit(0)

    if cli.action == 'status':
        server_url = get_server_by_name(cli.server)
        auth_token = google_authorization_token()

        response = http_request('GET', '{server_url}/api/workflows/v1/{uuid}/metadata'.format(server_url=server_url, uuid=cli.workflow_id), debug=verbose, headers={
            'Authorization': 'Bearer {}'.format(auth_token)
        })
        json_response = response.json()
        calls = json_response['calls']
        wf_status = json_response['status']
        print('Workflow status: {}'.format(wf_status))

        table = []
        for call_fqn, shards in calls.items():
            for index, shard in enumerate(shards):
                table.append([call_fqn, shard['executionStatus']])
        print(md_table(table, ['FQN', 'status']))

    if cli.action == 'query':
        server_url = get_server_by_name(cli.server)
        auth_token = google_authorization_token()

        for endpoint in ['status', 'outputs', 'logs', 'metadata']:
            print("http '{url}/api/workflows/v1/{workflow_id}/{endpoint}' 'Authorization: Bearer {auth_token}'".format(
                url=server_url,
                endpoint=endpoint,
                auth_token=auth_token,
                workflow_id=cli.workflow_id
            ))

    if cli.action == 'run':
        if cli.prefix:
            if cli.wdl:
                sys.stderr.write("--prefix and --wdl are mutually exclusive\n")
                sys.exit(1)
            wdl_file = cli.prefix + ".wdl"
            inputs_file = cli.prefix + ".json"
            options_file = cli.prefix + ".options.json"
            if not os.path.isfile(inputs_file): inputs_file = '-'
            if not os.path.isfile(options_file): options_file = '-'
        else:
            wdl_file = cli.wdl
            inputs_file = cli.inputs
            options_file = cli.options

        for f in [wdl_file, inputs_file, options_file]:
            if f is None:
                sys.stderr.write('You need to specify three files: WDL file, inputs JSON (optional), and workflow options (optional)\n')
                sys.stderr.write('\n')
                sys.stderr.write('Specify either:\n')
                sys.stderr.write('  --wdl, --inputs, --options\n')
                sys.stderr.write('  --prefix\n')
                sys.stderr.write('\n')
                sys.stderr.write('Note that --inputs and --options can take a single dash as the value to signify "no inputs" or "no options"\n')
                sys.exit(1)
            if f != '-' and not os.path.isfile(f):
                sys.stderr.write('{} is not a file\n'.format(f))
                sys.exit(1)

        if cli.server:
            server_url = get_server_by_name(cli.server)
            workflow_ids = []
            for i in range(int(cli.submissions)):
                try:
                    wf_id = run_client(server_url, wdl_file, inputs_file, options_file, poll=cli.poll, dry_run=cli.dry)
                    workflow_ids.append(wf_id)
                except:
                    print("Unexpected error: {}".format(sys.exc_info()[0]))

            print("Submitted Workflows:\n")
            print("\n".join(workflow_ids))
        else:
            if not cli.build:
                sys.stderr.write('--build is required.  See builds using `cromtool build ls`\n')
                sys.exit(1)
            if cli.build not in os.listdir(build_root):
                sys.stderr.write('Build {} does not exist.\n\nSee builds with `cromtool build ls`\nCreate a new build with `cromtool build add`\n')
                sys.exit(1)
            jar = find(r'cromwell-.*\.jar$', os.path.join(build_root, cli.build))
            if jar is None:
                sys.stderr.write('No JAR file found for build {}.  Maybe corrupted build?  Try removing and rebuilding.\n'.format(cli.build))
                sys.exit(1)
            config_file = os.path.abspath(os.path.expanduser(cli.config)) if cli.config else None
            run_local(jar, wdl_file, inputs_file, options_file, config=config_file)

    if cli.action == 'mysql':
        if cli.env not in conf['environments']:
            sys.stderr.write('Invalid --env option.  Should be one of: {}\n'.format(', '.join(conf['environments'].keys())))
            sys.exit(1)
        print('mysql --host=mysql.dsde-dev.broadinstitute.org --user={} --password={} -D cromwell'.format(
          conf['environments'][cli.env]['mysql_user'],
          conf['environments'][cli.env]['mysql_password']
        ))

    if cli.action == 'server':
        if cli.server_action == "add":
            if cli.name in conf['servers']:
                sys.stderr.write('server "{name}" already exists.  Use "cromtool server rm {name}" to remove\n'.format(name=cli.name))
                sys.exit(1)
            parsed_url = urlparse(cli.url)

            if parsed_url.scheme not in ['http', 'https']:
                sys.stderr.write("Invalid scheme in URL, expecting http or https: {}".format(cli.url))
                sys.exit(1)

            port = parsed_url.port
            if port is None:
                if parsed_url.scheme == 'http': port = 80
                elif parsed_url.scheme == 'https': port = 443
                else:
                    sys.stderr.write("Invalid URL: {}".format(cli.url))
                    sys.exit(1)

            conf['servers'][cli.name] = {
                "protocol": parsed_url.scheme,
                "host": parsed_url.hostname,
                "port": port,
            }
            with open(cromtool_conf_file, 'w') as fp:
                fp.write(json.dumps(conf, indent=4))

        elif cli.server_action == "ls":
            with open(cromtool_conf_file) as fp:
                conf = json.loads(fp.read())
            table = [[k, '{0}://{1}:{2}'.format(v['protocol'], v['host'], v['port'])] for k, v in conf['servers'].items()]
            print(md_table(table, ['Name', 'URL']))

        elif cli.server_action == "rm":
            if cli.name not in conf['servers']:
                sys.stderr.write('server "{}" does not exist\n'.format(cli.name))
                sys.exit(1)
            del conf['servers'][cli.name]
            with open(cromtool_conf_file, 'w') as fp:
                fp.write(json.dumps(conf, indent=4))

        elif cli.build_action is None:
            print("Missing subcommand")
            sys.exit(1)

        else:
            print("Invalid sub-command")
            sys.exit(1)

    if cli.action == 'build':
        if cli.build_action == "add":
            build_commands = [
                'git init',
                'git remote add origin https://github.com/broadinstitute/cromwell.git',
                'git fetch',
                'git reset --hard ' + cli.git_ref,
                'sbt assembly'
            ]
            temp_dir = tempfile.mkdtemp(dir=tmp_root)
            build_name = cli.name if cli.name else cli.git_ref
            build_dir = os.path.join(build_root, build_name)
            if os.path.isdir(build_dir):
              sys.stderr.write("Build '{name}' already exists\n\nTo remove: rm -rf {dir}\n".format(name=build_name, dir=build_dir))
              sys.exit(1)
            os.makedirs(build_dir)
            for build_command in build_commands:
                (rc, stdout, stderr) = run(build_command, cwd=temp_dir)
                if rc != 0:
                  sys.stderr.write("{}: command {} with RC {}\n".format(colorize("ERROR", ansi=1), build_command, rc))
                  sys.exit(1)
            jar = find(r'cromwell-.*\.jar$', os.path.join(temp_dir, 'target'))
            if jar is None:
                sys.stderr.write('Could not find Cromwell JAR file\n')
                sys.exit(1)
            shutil.copy(jar, build_dir)
            with open(os.path.join(build_dir, 'ref'), 'w') as fp:
                fp.write(cli.git_ref)
            print("{}: build dir: {}".format(colorize("success", ansi=2), build_dir))

        elif cli.build_action == "ls":
            rows = []
            for build in os.listdir(build_root):
                with open(os.path.join(build_root, build, 'ref')) as fp:
                    ref = fp.read()
                jar = find(r'cromwell-.*\.jar$', os.path.join(build_root, build))
                rows.append([build, ref, jar])
            print(md_table(rows, ['Name', 'Git tree-like', 'JAR Path']))

        elif cli.build_action is None:
            print("Missing subcommand")
            sys.exit(1)

        else:
            print("Invalid sub-command")
            sys.exit(1)

    #liquibase --driver=com.mysql.jdbc.Driver \
    #          --classpath=${HOME}/.ivy2/cache/mysql/mysql-connector-java/jars/mysql-connector-java-5.1.35.jar \
    #          --changeLogFile=src/main/migrations/changelog.xml \
    #          --url="jdbc:mysql://localhost/cromwell" \
    #          --username="root" \
    #          --password="" \
    #          migrate
