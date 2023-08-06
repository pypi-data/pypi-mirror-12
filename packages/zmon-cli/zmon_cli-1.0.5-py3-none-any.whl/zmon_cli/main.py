#!/usr/bin/env python2
import json
import textwrap
import zmon_cli
import urllib

from clickclick import action, ok, error, AliasedGroup, print_table, OutputFormat
from zmon_cli.console import highlight

import click
import logging
import os
import requests
from requests.auth import HTTPBasicAuth
import yaml
import time

from redis import StrictRedis

DEFAULT_CONFIG_FILE = '~/.zmon-cli.yaml'

CONTEXT_SETTINGS = dict(help_option_names=['-h', '--help'])

output_option = click.option('-o', '--output', type=click.Choice(['text', 'json', 'tsv']), default='text',
                             help='Use alternative output format')


def print_version(ctx, param, value):
    if not value or ctx.resilient_parsing:
        return
    click.echo('ZMON CLI {}'.format(zmon_cli.__version__))
    ctx.exit()


def configure_logging(loglevel):
    # configure file logger to not clutter stdout with log lines
    logging.basicConfig(level=loglevel, filename='/tmp/zmon-cli.log',
                        format='%(asctime)s %(levelname)s %(name)s: %(message)s')
    logging.getLogger('urllib3.connectionpool').setLevel(logging.WARNING)
    logging.getLogger('requests.packages.urllib3.connectionpool').setLevel(logging.WARNING)


@click.group(cls=AliasedGroup, context_settings=CONTEXT_SETTINGS)
@click.option('--config-file', help='Use alternative config file', default=DEFAULT_CONFIG_FILE, metavar='PATH')
@click.option('-v', '--verbose', help='Verbose logging', is_flag=True)
@click.option('-V', '--version', is_flag=True, callback=print_version, expose_value=False, is_eager=True)
@click.pass_context
def cli(ctx, config_file, verbose):
    """
    zmon command line interface
    """
    configure_logging(logging.DEBUG if verbose else logging.INFO)
    fn = os.path.expanduser(config_file)
    data = {}
    if os.path.exists(fn):
        with open(fn) as fd:
            data = yaml.safe_load(fd)
    ctx.obj = data


def check_redis_host(host, port=6379):
    action("Check Redis on {}".format(host))
    action("...")
    try:
        r = StrictRedis(host, port)
        workers = r.smembers("zmon:metrics")
        ok()
        return r, workers
    except Exception as e:
        error(e)


def check_queues(redis):
    queues = ['zmon:queue:default', 'zmon:queue:snmp', 'zmon:queue:internal', 'zmon:queue:secure']

    for q in queues:
        action('Checking queue length ... {} ...'.format(q))
        l = redis.llen(q)
        action("...")
        highlight("{}".format(l))
        action(" ...")
        if l < 2000:
            ok()
            continue
        error("to many tasks")


def check_schedulers(r, schedulers):
    for s in schedulers:
        action('Check scheduler {} .....'.format(s[2:]))
        try:
            ts = r.get("zmon:metrics:{}:ts".format(s))
            if ts is None:
                error("No scheduling loop registered ( running/stuck? )")
                continue

            delta = int(time.time() - float(ts))
            action("... last loop")
            highlight("{}".format(delta))
            action("s ago ...")
            if delta > 300:
                error("Last loop more than 300s ago (stuck? restart?)".format(delta))
                continue

            if delta > 180:
                error("Last loop more than 180s ago (stuck? check logs/watch)".format(delta))
                continue

            action("...")
            ok()
        except Exception as e:
            error(e)


def check_workers(r, workers):
    for w in workers:
        action('Check worker {} ...'.format(w))
        try:
            ts = r.get("zmon:metrics:{}:ts".format(w))
            delta = time.time() - float(ts)
            delta = max(int(delta), 0)

            action("... last exec")
            highlight("{}".format(delta))
            action("s ago ...")
            if delta < 30:
                ok()
                continue

            error("no task execute recently")

        except Exception as e:
            error(e)


def get_config_data():
    fn = os.path.expanduser(DEFAULT_CONFIG_FILE)
    data = {}
    if os.path.exists(fn):
        with open(fn) as fd:
            data = yaml.safe_load(fd)
    else:
        raise Exception("Config file not found: ~/.zmon-cli.yaml")

    return validate_config(data)


def validate_config(data):
    if "user" not in data or "password" not in data:
        raise Exception("Config file not properly configured: keys 'user' and 'password' are missing")
    if "url" not in data:
        raise Exception("Config file not properly configured: key 'url' is missing")

    return data


def get(url):
    data = get_config_data()
    r = requests.get(data['url'] + url, auth=HTTPBasicAuth(data['user'], data['password']))
    r.raise_for_status()
    return r


def put(url, body):
    data = get_config_data()
    r = requests.put(data['url'] + url, data=body, auth=HTTPBasicAuth(data['user'], data['password']),
                     headers={'content-type': 'application/json'})
    r.raise_for_status()
    return r


def delete(url):
    data = get_config_data()
    r = requests.delete(data['url'] + url, auth=HTTPBasicAuth(data['user'], data['password']))
    r.raise_for_status()
    return r


@cli.group()
@click.pass_context
def members(ctx):
    """Manage group membership"""
    pass


@cli.group('alert-definitions')
@click.pass_context
def alert_definitions(ctx):
    """Manage alert definitions"""
    pass


@alert_definitions.command('init')
@click.argument('yaml_file', type=click.File('wb'))
def init(yaml_file):
    '''Initialize a new alert definition YAML file'''
    template = textwrap.dedent('''
    check_definition_id: {check_id}
    id:
    status: ACTIVE
    name: "{name}"
    description: "Example Alert Description"
    team: "{team}"
    responsible_team: "{team}"
    condition: |
      >100
    entities:
    entities_exclude:
    status: ACTIVE
    priority: 2
    tags:
    parent_id:
    parameters:
    ''')
    name = click.prompt('Alert name', default='Example Alert')
    check_id = click.prompt('Check ID')
    team = click.prompt('(Responsible-) Team', default='Example Team')
    data = template.format(name=name, team=team, check_id=check_id)
    yaml_file.write(data.encode('utf-8'))


@alert_definitions.command('get')
@click.argument("alert_id", type=int)
def getAlertDefinition(alert_id):
    '''Get a single alert definition'''

    data = get('/alert-definitions/{}'.format(alert_id)).json()
    keys = list(data.keys())
    for k in keys:
        if data[k] is None:
            del data[k]

    print(yaml.safe_dump(data, default_flow_style=False, allow_unicode=True, encoding='utf-8').decode('utf-8'))


@alert_definitions.command("update")
@click.argument('yaml_file', type=click.File('rb'))
def updateAlertDef(yaml_file):
    """update a single check definition"""
    data = get_config_data()
    post = yaml.safe_load(yaml_file)
    post['last_modified_by'] = data['user']
    if 'status' not in post:
        post['status'] = 'ACTIVE'

    action('Updating alert definition..')

    if 'id' not in post:
        error('"id" missing in definition')
        return

    if 'check_definition_id' not in post:
        error('"check_definition_id" missing in definition')
        return

    alert_id = post['id']

    r = requests.put(data['url'] + '/alert-definitions/{}'.format(alert_id), json.dumps(post),
                     auth=HTTPBasicAuth(data['user'], data['password']), headers={'Content-Type': 'application/json'})
    if r.status_code != 200:
        error(r.text)
    r.raise_for_status()
    ok(get_config_data()["url"].replace("rest/api/v1", "") + "#/alert-details/" + str(r.json()["id"]))


@cli.group('check-definitions')
@click.pass_context
def check_definitions(ctx):
    """manage check definitions"""
    pass


@check_definitions.command("update")
@click.argument('yaml_file', type=click.File('rb'))
def update(yaml_file):
    """update a single check definition"""
    data = get_config_data()
    post = yaml.safe_load(yaml_file)
    post['last_modified_by'] = data['user']
    if 'status' not in post:
        post['status'] = 'ACTIVE'
    action('Updating check definition... ')
    r = requests.post(data['url'] + '/check-definitions', json.dumps(post),
                      auth=HTTPBasicAuth(data['user'], data['password']), headers={'Content-Type': 'application/json'})
    if r.status_code != 200:
        error(r.text)
    r.raise_for_status()
    ok(get_config_data()["url"].replace("rest/api/v1", "") + "#/check-definitions/view/" + str(r.json()["id"]))


@check_definitions.command('init')
@click.argument('yaml_file', type=click.File('wb'))
def init_check_definition(yaml_file):
    '''Initialize a new check definition YAML file'''
    template = textwrap.dedent('''
    status: ACTIVE
    name: "{name}"
    description: "Example ZMON check definition which returns a HTTP status code"
    owning_team: "{owning_team}"
    interval: 60 # seconds
    command: |
      http('http://example.org/', timeout=5).code()
    entities:
      - type: GLOBAL
    ''')
    name = click.prompt('Check definition name', default='Example Check')
    owning_team = click.prompt('Team owning this check definition (i.e. your team)', default='Example Team')
    data = template.format(name=name, owning_team=owning_team)
    yaml_file.write(data.encode('utf-8'))


@check_definitions.command("get")
@click.argument("check_id", type=int)
def getCheckDefinition(check_id):
    '''get a single check definition'''

    r = get('/check-definitions/{}'.format(check_id))

    if r.status_code != 200 or r.text == "":
        action("retrieving check " + str(check_id) + " ...")
        error("not found")
        return

    data = r.json()

    keys = list(data.keys())
    for k in keys:
        if data[k] is None:
            del data[k]

    print(yaml.safe_dump(data, default_flow_style=False, allow_unicode=True, encoding='utf-8').decode('utf-8'))


def render_entities(output, key=None, value=''):
    if key:
        r = get('/entities/?query={}'.format(json.dumps({key: value})))
    else:
        r = get('/entities/')

    entities = r.json()
    rows = []
    for e in entities:
        row = e
        s = sorted(e.keys())
        key_values = []
        for k in s:
            if k not in ('id', 'type'):
                key_values.append('{}={}'.format(k, e[k]))
        row['data'] = ' '.join(key_values)
        rows.append(row)

    rows.sort(key=lambda r: (r['id'], r['type']))
    with OutputFormat(output):
        print_table('id type data'.split(), rows)


@cli.group("entities", invoke_without_command=True)
@click.pass_context
@output_option
def entities(ctx, output):
    if not ctx.invoked_subcommand:
        render_entities(output)


@entities.command("push")
@click.argument("entity")
@click.pass_context
def push_entity(ctx, entity):
    if entity[-4:] == "json" and os.path.exists(entity):
        with open(entity, 'rb') as file:
            entity = file.read()
            data = json.loads(entity.decode())
    elif entity[-4:] == 'yaml' and os.path.exists(entity):
        with open(entity, 'rb') as fd:
            data = yaml.safe_load(fd)
    else:
        data = json.loads(entity)

    if not isinstance(data, list):
        data = [data]

    for e in data:
        action("creating entity...{}".format(e['id']))
        try:
            entity = json.dumps(e)
            r = put('/entities/', entity)
            if r.status_code == 200:
                ok()
            else:
                error()
        except:
            error("failed")


@entities.command("delete")
@click.argument("entity-id")
@click.pass_context
def delete_entity(ctx, entity_id):
    action("delete entity... {}".format(entity_id))
    try:
        r = delete('/entities/?id={}'.format(urllib.parse.quote_plus(entity_id)))
        if r.status_code == 200 and r.text == "1":
            ok()
        else:
            error("Delete unsuccessfull")
    except Exception as ex:
        error("Exception during delete: " + str(ex))


@entities.command("get")
@click.argument("entity-id")
@click.pass_context
def get_entity(ctx, entity_id):
    try:
        r = get('/entities/{}/'.format(urllib.parse.quote_plus(entity_id)))
        if r.status_code == 200 and r.text != "":
            print(yaml.safe_dump(r.json(), default_flow_style=False,
                                 allow_unicode=True,
                                 encoding='utf-8').decode('utf-8'))
        else:
            action("getting entity " + entity_id + "...")
            error("not found")
    except Exception as ex:
        error("Exception during get entity: " + str(ex))


@entities.command("filter")
@click.argument("key")
@click.argument("value")
@click.pass_context
@output_option
def filter_entities(ctx, key, value, output):
    '''List entities filtered by a certain key'''
    render_entities(output, key, value)


@cli.group(invoke_without_command=True)
@click.pass_context
def groups(ctx):
    """manage contact groups"""
    if not ctx.invoked_subcommand:
        r = get("/groups/")
        for t in r.json():
            print("Name: {} Id: {}".format(t["name"], t["id"]))
            print("\tMembers:")
            for m in t["members"]:
                m = get("/groups/member/{}/".format(m)).json()
                print("\t\t{} {} {}".format(m["name"], m["email"], m["phones"]))
            print("\tActive:")
            for m in t["active"]:
                m = get("/groups/member/{}/".format(m)).json()
                print("\t\t{} {} {}".format(m["name"], m["email"], m["phones"]))


@groups.command("switch")
@click.argument("group_name")
@click.argument("user_name")
@click.pass_context
def switch_active(ctx, group_name, user_name):
    action("Switching active user ....")
    r = delete("/groups/{}/active/".format(group_name))
    r = put("/groups/{}/active/{}/".format(group_name, user_name))
    if r.text == '1':
        ok()
    else:
        error("failed to switch")


@members.command("add")
@click.argument("group_name")
@click.argument("user_name")
@click.pass_context
def group_add(ctx, group_name, user_name):
    action("Adding user ....")
    r = put("/groups/{}/member/{}/".format(group_name, user_name))
    if r.text == '1':
        ok()
    else:
        error("failed to insert")


@members.command("remove")
@click.argument("group_name")
@click.argument("user_name")
@click.pass_context
def group_remove(ctx, group_name, user_name):
    action("Removing user ....")
    r = delete("/groups/{}/member/{}/".format(group_name, user_name))
    if r.text == '1':
        ok()
    else:
        error("failed to remove")


@members.command("add-phone")
@click.argument("member_email")
@click.argument("phone_nr")
@click.pass_context
def add_phone(ctx, member_email, phone_nr):
    action("Adding phone ....")
    r = put("/groups/{}/phone/{}/".format(member_email, phone_nr))
    if r.text == '1':
        ok()
    else:
        error("failed to set phone")


@members.command("remove-phone")
@click.argument("member_email")
@click.argument("phone_nr")
@click.pass_context
def remove_phone(ctx, member_email, phone_nr):
    action("Removing phone number ....")
    r = delete("/groups/{}/phone/{}/".format(member_email, phone_nr))
    if r.text == '1':
        ok()
    else:
        error("failed to remove phone")


@members.command("change-name")
@click.argument("member_email")
@click.argument("member_name")
@click.pass_context
def set_name(ctx, member_email, member_name):
    action("Changing user name ....")
    put("/groups/{}/name/{}/".format(member_email, member_name))
    ok()


@cli.command()
@click.pass_obj
def status(config):
    """check system status"""
    redis, workers = check_redis_host(config['redis_host'], 6379)

    print("")

    workers = list(map(lambda x: x.decode(), sorted(workers)))

    action("Looking for <30s interval scheduler ...")
    scheduler = list(filter(lambda x: x[:7] == 's-p3423', workers))
    if not scheduler:
        error("not found! check p3423")
    else:
        action("... running {}".format(scheduler[0][2:]))
        ok()

    action("Looking for >30s interval scheduler ...")
    scheduler = list(filter(lambda x: x[:7] == 's-p3422', workers))
    if not scheduler:
        error("not found! check p3422")
    else:
        action("... running {}".format(scheduler[0][2:]))
        ok()

    action("Looking for NG scheduler ...")
    scheduler = list(filter(lambda x: x == 's-p3421.monitor02', workers))
    if not scheduler:
        error("not found! check p3421 on monitor02")
    else:
        action("... running {}".format(scheduler[0][2:]))
        ok()

    action("Looking for self monitoring scheduler ...")
    scheduler = list(filter(lambda x: x == 's-p3421.itr-monitor01', workers))
    if not scheduler:
        error("not found! check p3411 on itr-monitor02")
    else:
        action("... running {}".format(scheduler[0][2:]))
        ok()

    print("")

    ws = []
    ss = []

    for w in workers:
        if w[:2] == "s-":
            ss.append(w)
        else:
            ws.append(w)

    check_schedulers(redis, ss)
    print("")

    check_queues(redis)
    print("")

    check_workers(redis, ws)


@cli.command()
@click.pass_context
def help(ctx):
    pass


def main():
    try:
        cli()
    except requests.HTTPError as e:
        click.secho('ERROR: {}'.format(e), bold=True, fg='red')
