import datetime
import os
import re

import click

import requests
import time
from zign.api import get_named_token
from clickclick import error, AliasedGroup, print_table, OutputFormat

from .api import docker_login, request, get_latest_tag, DockerImage
import pierone
import stups_cli.config


KEYRING_KEY = 'pierone'

CONTEXT_SETTINGS = dict(help_option_names=['-h', '--help'])

output_option = click.option('-o', '--output', type=click.Choice(['text', 'json', 'tsv']), default='text',
                             help='Use alternative output format')

TEAM_PATTERN = re.compile(r'^[a-z][a-z0-9-]+$')


def validate_team(ctx, param, value):
    if not TEAM_PATTERN.match(value):
        raise click.BadParameter('Team ID must satisfy regular expression pattern "[a-z][a-z0-9]+"')
    return value


def parse_time(s: str) -> float:
    '''
    >>> parse_time('2015-04-14T19:09:01.000Z') > 0
    True
    '''
    try:
        utc = datetime.datetime.strptime(s, '%Y-%m-%dT%H:%M:%S.%fZ')
        ts = time.time()
        utc_offset = datetime.datetime.fromtimestamp(ts) - datetime.datetime.utcfromtimestamp(ts)
        local = utc + utc_offset
        return local.timestamp()
    except Exception as e:
        print(e)
        return None


def print_version(ctx, param, value):
    if not value or ctx.resilient_parsing:
        return
    click.echo('Pier One CLI {}'.format(pierone.__version__))
    ctx.exit()


@click.group(cls=AliasedGroup, context_settings=CONTEXT_SETTINGS)
@click.option('-V', '--version', is_flag=True, callback=print_version, expose_value=False, is_eager=True,
              help='Print the current version number and exit.')
@click.pass_context
def cli(ctx):
    ctx.obj = stups_cli.config.load_config('pierone')


@cli.command()
@click.option('--url', help='Pier One URL', metavar='URI')
@click.option('--realm', help='Use custom OAuth2 realm', metavar='NAME')
@click.option('-n', '--name', help='Custom token name (will be stored)', metavar='TOKEN_NAME', default='pierone')
@click.option('-U', '--user', help='Username to use for authentication', envvar='PIERONE_USER', metavar='NAME')
@click.option('-p', '--password', help='Password to use for authentication', envvar='PIERONE_PASSWORD', metavar='PWD')
@click.pass_obj
def login(obj, url, realm, name, user, password):
    '''Login to Pier One Docker registry (generates ~/.dockercfg'''
    config = obj

    url = url or config.get('url')
    user = user or os.getenv('USER')

    while not url:
        url = click.prompt('Please enter the Pier One URL')
        if not url.startswith('http'):
            url = 'https://{}'.format(url)

        try:
            requests.get(url, timeout=5)
        except:
            error('Could not reach {}'.format(url))
            url = None

        config['url'] = url

    stups_cli.config.store_config(config, 'pierone')

    docker_login(url, realm, name, user, password, prompt=True)


def get_token():
    try:
        token = get_named_token(['uid'], None, 'pierone', None, None)
    except:
        raise click.UsageError('No valid OAuth token named "pierone" found. Please use "pierone login".')
    return token


@cli.command()
@output_option
@click.pass_obj
def teams(config, output):
    '''List all teams having artifacts in Pier One'''
    token = get_token()

    r = request(config.get('url'), '/teams', token['access_token'])
    rows = [{'name': name} for name in sorted(r.json())]
    with OutputFormat(output):
        print_table(['name'], rows)


def get_artifacts(url, team, access_token):
    r = request(url, '/teams/{}/artifacts'.format(team), access_token)
    return r.json()


def get_tags(url, team, art, access_token):
    r = request(url, '/teams/{}/artifacts/{}/tags'.format(team, art), access_token)
    return r.json()


@cli.command()
@click.argument('team', callback=validate_team)
@output_option
@click.pass_obj
def artifacts(config, team, output):
    '''List all team artifacts'''
    token = get_token()

    result = get_artifacts(config.get('url'), team, token['access_token'])
    rows = [{'team': team, 'artifact': name} for name in sorted(result)]
    with OutputFormat(output):
        print_table(['team', 'artifact'], rows)


@cli.command()
@click.argument('team', callback=validate_team)
@click.argument('artifact', nargs=-1)
@output_option
@click.pass_obj
def tags(config, team, artifact, output):
    '''List all tags'''
    token = get_token()

    if not artifact:
        artifact = get_artifacts(config.get('url'), team, token['access_token'])

    rows = []
    for art in artifact:
        r = get_tags(config.get('url'), team, art, token['access_token'])
        rows.extend([{'team': team,
                      'artifact': art,
                      'tag': row['name'],
                      'created_by': row['created_by'],
                      'created_time': parse_time(row['created'])}
                     for row in r])

    rows.sort(key=lambda row: (row['team'], row['artifact'], row['tag']))
    with OutputFormat(output):
        print_table(['team', 'artifact', 'tag', 'created_time', 'created_by'], rows,
                    titles={'created_time': 'Created', 'created_by': 'By'})


@cli.command()
@click.argument('team', callback=validate_team)
@click.argument('artifact')
@output_option
@click.pass_obj
def latest(config, team, artifact, output):
    '''Get latest tag/version of a specific artifact'''
    # validate that the token exists!
    get_token()

    registry = config.get('url')
    if registry.startswith('https://'):
        registry = registry[8:]
    image = DockerImage(registry=registry, team=team, artifact=artifact, tag=None)

    print(get_latest_tag('pierone', image))


@cli.command('scm-source')
@click.argument('team', callback=validate_team)
@click.argument('artifact')
@click.argument('tag', nargs=-1)
@output_option
@click.pass_obj
def scm_source(config, team, artifact, tag, output):
    '''Show SCM source information such as GIT revision'''
    token = get_token()

    tags = get_tags(config.get('url'), team, artifact, token['access_token'])

    if not tag:
        tag = [t['name'] for t in tags]

    rows = []
    for t in tag:
        row = request(config.get('url'), '/teams/{}/artifacts/{}/tags/{}/scm-source'.format(team, artifact, t),
                      token['access_token']).json()
        if not row:
            row = {}
        row['tag'] = t
        matching_tag = [d for d in tags if d['name'] == t]
        row['created_by'] = ''.join([d['created_by'] for d in matching_tag])
        if matching_tag:
            row['created_time'] = parse_time(''.join([d['created'] for d in matching_tag]))
        rows.append(row)

    rows.sort(key=lambda row: (row['tag'], row.get('created_time')))
    with OutputFormat(output):
        print_table(['tag', 'author', 'url', 'revision', 'status', 'created_time', 'created_by'], rows,
                    titles={'tag': 'Tag', 'created_by': 'By', 'created_time': 'Created',
                            'url': 'URL', 'revision': 'Revision', 'status': 'Status'},
                    max_column_widths={'revision': 10})


@cli.command('image')
@click.argument('image')
@output_option
@click.pass_obj
def image(config, image, output):
    '''List tags that point to this image'''
    token = get_token()

    resp = request(config.get('url'), '/tags/{}'.format(image), token['access_token'])

    if resp.status_code == 404:
        click.echo('Image {} not found'.format(image))
        return

    if resp.status_code == 412:
        click.echo('Prefix {} matches more than one image.'.format(image))
        return

    tags = resp.json()

    with OutputFormat(output):
        print_table(['team', 'artifact', 'name'],
                    tags,
                    titles={'name': 'Tag', 'artifact': 'Artifact', 'team': 'Team'})


def main():
    cli()
