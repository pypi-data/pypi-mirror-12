#!/usr/bin/env python
from importlib import import_module
import json
import sys
import os
import pip

import click


LOG_FORMAT_EX = '%(asctime)s %(levelname)s [%(name)s %(filename)s:'\
    '%(funcName)s:%(lineno)d] %(message)s'
LOG_FORMAT_NO = '%(asctime)s %(levelname)s %(message)s'


@click.group()
@click.version_option(version='0.1')
@click.option('--config',
              '-c',
              type=click.Path(exists=False,
                              file_okay=True,
                              dir_okay=False,
                              writable=False,
                              resolve_path=True),
              default='/etc/tourbillon/tourbillon.conf',
              help='specify a different config file',
              metavar='<config_file>')
def cli(config):
    """tourbillon: send metrics to an influxdb"""
    pass


@cli.command()
@click.pass_context
def init(ctx):
    """initialize the tourbillon configuration"""
    config_file = ctx.parent.params['config']
    click.echo(click.style('\nConfigure Tourbillon agent\n',
                           fg='blue', bold=True, underline=True))
    click.echo(click.style('InfluxDB configuration\n',
                           fg='magenta', underline=True))
    host = click.prompt('Enter the InfluxDB hostname', default='localhost')
    port = click.prompt('Enter the InfluxDB port', default=8086, type=int)
    username = click.prompt('Enter the InfluxDB username [Enter for no auth]',
                            default='',
                            show_default=False)
    password = None
    if username:
        password = click.prompt('Enter the InfluxDB password',
                                hide_input=True,
                                confirmation_prompt=True)

    click.echo(click.style('\nLogging configuration\n',
                           fg='magenta', underline=True))
    log_level = click.prompt('Enter the log level', type=click.Choice([
                             'CRITICAL',
                             'ERROR',
                             'WARNING',
                             'INFO',
                             'DEBUG'
                             ]), default='INFO')
    log_format = click.prompt('Enter the log format', type=click.Choice([
        'default',
        'extended']), default='default')

    fmt = LOG_FORMAT_NO if log_format == 'default' else LOG_FORMAT_EX
    config = {
        'database': {
            'host': host,
            'port': port
        },
        'log_format': fmt,
        'log_level': log_level,
        'plugins_conf_dir': '${tourbillon_conf_dir}/conf.d'
    }
    if username:
        config['database']['username'] = username
        config['database']['password'] = password

    with open(config_file, 'w') as f:
        json.dump(config, f, indent=4)

    click.echo(click.style('\nconfiguration file generated\n', fg='green'))


@cli.command()
@click.pass_context
@click.argument('search_term', nargs=1, required=True)
def search(ctx, search_term):
    pip_args = ['search', search_term]
    pip.main(pip_args)


@cli.command()
@click.pass_context
@click.argument('plugin', nargs=1, required=True)
def install(ctx, plugin):
    pip_args = ['install']
    pip_args.append(plugin)
    pip.main(pip_args)


@cli.command()
@click.pass_context
@click.argument('plugin', nargs=1, required=True)
def upgrade(ctx, plugin):
    pip_args = ['install', '-U']
    pip_args.append(plugin)
    pip.main(pip_args)


@cli.command()
@click.pass_context
@click.argument('plugin', nargs=1, required=True)
def reinstall(ctx, plugin):
    pip_args = ['install', '--force-reinstall', '-U']
    pip_args.append(plugin)
    pip.main(pip_args)


@cli.command()
@click.pass_context
def show(ctx):
    """show the list of enabled plugins"""
    config_file = ctx.parent.params['config']
    with open(config_file, 'r') as f:
        config = json.load(f)

    if 'plugins' not in config:
        click.echo('no enabled plugins')
        return

    for key, value in config['plugins'].items():
        click.echo('module: {0} - functions: {1}'.format(
                   key, ', '.join(value)))


@cli.command()
@click.pass_context
def clear(ctx):
    """remove all plugins from configuration"""
    config_file = ctx.parent.params['config']
    with open(config_file, 'r') as f:
        config = json.load(f)

    if 'plugins' in config:
        del config['plugins']
        with open(config_file, 'w') as f:
            json.dump(config, f, indent=2, sort_keys=True)

    click.echo('All plugins removed')


def validate_plugins(ctx, param, value):
    result = {}
    for v in value:
        if '=' not in v:
            raise click.BadParameter('plugin %s in not valid' % v)
        module, functions = v.replace(' ', '').split('=')
        result[module] = functions.split(',')
    return result


@cli.command(short_help='enable one or more plugins')
@click.pass_context
@click.argument('plugins', nargs=-1, required=True,
                callback=validate_plugins)
def enable(ctx, plugins):
    """Enable one or more plugins

PLUGINS are expressed in the form:

    module1.submodule1=function1,function2,... module2=function3,...

Example:

    tourbillon enable tourbillon.linux=get_cpu_usage,get_mem_usage

Enable the functions get_cpu_usage and get_mem_usage of the
'tourbillon.linux' plugin.
    """
    config_file = ctx.parent.params['config']
    with open(config_file, 'r') as f:
        config = json.load(f)
    if 'plugins' not in config:
        config['plugins'] = {}

    for module, functions in plugins.items():
        try:
            m = import_module(module)
        except:
            click.echo('module %s does not exists' % module)
            continue
        if module not in config['plugins']:
            config['plugins'][module] = []
        for f in functions:
            if not hasattr(m, f):
                click.echo('module %s does not contains %s' % (module, f))
                continue
            if f not in config['plugins'][module]:
                config['plugins'][module].append(f)

        if len(config['plugins'][module]) == 0:
            del config['plugins'][module]

    with open(config_file, 'w') as f:
        json.dump(config, f, indent=2, sort_keys=True)


@cli.command(short_help='disable one or more plugins')
@click.pass_context
@click.argument('plugins', nargs=-1, required=True, callback=validate_plugins)
def disable(ctx, plugins):
    """Disable one or more plugins

PLUGINS are expressed in the form:

    module1.submodule1=function1,function2,... module2=function3,...

Example:

    tourbillon disable tourbillon.linux=get_cpu_usage,get_mem_usage

Disable the functions get_cpu_usage and get_mem_usage of the
'tourbillon.linux' plugin
    """
    config_file = ctx.parent.params['config']
    with open(config_file, 'r') as f:
        config = json.load(f)
    if 'plugins' not in config:
        return

    for module, functions in plugins.items():
        if module not in config['plugins']:
            continue
        for f in functions:
            if f in config['plugins'][module]:
                config['plugins'][module].remove(f)
        if len(config['plugins'][module]) == 0:
            del config['plugins'][module]

    with open(config_file, 'w') as f:
        json.dump(config, f, indent=2, sort_keys=True)


@cli.command()
@click.pass_context
def run(ctx):
    """run the agent"""
    config_file = ctx.parent.params['config']
    ag = Tourbillon(config_file)
    ag.run()


def main():
    cli(prog_name='tourbillon', standalone_mode=False)

if __name__ == '__main__':
    if __package__ is None:
        path = os.path.dirname(os.path.dirname(os.path.dirname(
                               os.path.abspath(__file__))))

        sys.path.append(path)
    from tourbillon.agent import Tourbillon
    main()
