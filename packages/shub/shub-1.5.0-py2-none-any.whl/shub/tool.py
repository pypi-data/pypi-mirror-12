import click, importlib
import shub
from shub.utils import missing_modules

def missingmod_cmd(modules):
    modlist = ", ".join(modules)
    @click.command(help="*DISABLED* - requires %s" % modlist)
    @click.pass_context
    def cmd(ctx):
        click.echo("Error: '%s' command requires %s" % (ctx.info_name, modlist))
        ctx.exit(1)
    return cmd

@click.group(help="Scrapinghub command-line client")
@click.version_option(shub.__version__)
def cli():
    pass

module_deps = {
    "deploy": ["scrapy", "setuptools"],
    "login": [],
    "deploy_egg": [],
    "fetch_eggs": [],
    "deploy_reqs": [],
    "logout": [],
    "version": [],
    "items": [],
    "schedule": [],
    "log": [],
    "requests": [],
}

for command, modules in module_deps.items():
    m = missing_modules(*modules)
    if m:
        cli.add_command(missingmod_cmd(m), command)
    else:
        module_path = "shub." + command
        command_module = importlib.import_module(module_path)
        command_name = command.replace('_', '-') # easier to type
        cli.add_command(command_module.cli, command_name)
