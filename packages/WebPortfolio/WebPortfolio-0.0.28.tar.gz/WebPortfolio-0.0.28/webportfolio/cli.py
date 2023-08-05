"""
WebPortfolio

Command line tool

web-portfolio -c project_name

"""

import os
import re
import sys
import logging
import importlib
import pkg_resources
import utils
import __about__
import click

CWD = os.getcwd()
SKELETON_DIR = "app-skel"
APPLICATION_DIR = "%s/application" % CWD
APPLICATION_DATA_DIR = "%s/data" % APPLICATION_DIR

def get_project_dir_path(project_name):
    return "%s/%s" % (APPLICATION_DIR, project_name)

def copy_resource(src, dest):
    """
    To copy package data to destination
    """
    dest = (dest + "/" + os.path.basename(src)).rstrip("/")
    if pkg_resources.resource_isdir("webportfolio", src):
        if not os.path.isdir(dest):
            os.makedirs(dest)
        for res in pkg_resources.resource_listdir(__name__, src):
            copy_resource(src + "/" + res, dest)
    else:
        if os.path.splitext(src)[1] not in [".pyc"]:
            with open(dest, "wb") as f:
                f.write(pkg_resources.resource_string(__name__, src))


def create_project(project_name, template="app"):
    """
    Create the project
    """

    project_dir = get_project_dir_path(project_name)
    serve_tpl = pkg_resources.resource_string(__name__, '%s/serve.py' % (SKELETON_DIR))
    propel_tpl = pkg_resources.resource_string(__name__, '%s/propel.yml' % (SKELETON_DIR))
    config_tpl = pkg_resources.resource_string(__name__, '%s/config.py' % (SKELETON_DIR))
    model_tpl = pkg_resources.resource_string(__name__, '%s/model.py' % (SKELETON_DIR))
    manage_tpl = pkg_resources.resource_string(__name__, '%s/manage.py' % (SKELETON_DIR))

    serve_file = "%s/serve_%s.py" % (CWD, project_name)
    requirements_txt = "%s/requirements.txt" % CWD
    propel_yml = "%s/propel.yml" % CWD
    config_py = "%s/config.py" % APPLICATION_DIR
    model_py = "%s/model.py" % APPLICATION_DIR
    manage_py = "%s/manage.py" % CWD

    dirs = [
        APPLICATION_DIR,
        APPLICATION_DATA_DIR,
        project_dir
    ]
    for dir in dirs:
        if not os.path.isdir(dir):
            os.makedirs(dir)

    files = [
        ("%s/__init__.py" % APPLICATION_DIR, "# WebPortfolio"),
        (config_py, config_tpl),
        (model_py, model_tpl),
        (serve_file, serve_tpl.format(project_name=project_name)),
        (requirements_txt, "%s==%s" % (__about__.name, __about__.version)),
        (propel_yml, propel_tpl.format(project_name=project_name)),
        (manage_py, manage_tpl)
    ]

    for file in files:
        if not os.path.isfile(file[0]):
            with open(file[0], "wb") as f:
                f.write(file[1])

    copy_resource("%s/%s/" % (SKELETON_DIR, template), project_dir)

    copy_resource("%s/%s/" % (SKELETON_DIR, "data"), APPLICATION_DATA_DIR)

# ------------------------------------------------------------------------------
# ------------------------------------------------------------------------------

def _addCWDToSysPath():
    sys.path.append(CWD)

def _title(title=None):
    _description = "-" * 80
    _description += "\n%s %s" % (__about__.name, __about__.version)
    click.echo(_description)
    click.echo("")
    if title:
        click.echo("** %s **" % title)
        click.echo("")

_object_name_regex = re.compile('[^a-zA-Z]')
def format_project_name(name):
    return _object_name_regex.sub("", name)

def get_project_serve_module(project):
    _addCWDToSysPath()
    if "serve_" not in project:
        project = format_project_name(project)
        project = "serve_%s" % project
    return importlib.import_module(project)

def import_project_module(module):
    _addCWDToSysPath()
    return importlib.import_module(module)

@click.group()
def cli():
    pass

@cli.command()
@click.option("--project", "-p", default="www")
def new(project):
    """  Create a new project """

    project = format_project_name(project)

    _title("Creating new project ...")
    click.echo("- Project: %s " % project)

    create_project(project)

    click.echo("- Sweet! Your new project [ %s ] has been created" % project)
    click.echo("- Location: [ application/%s ]" % project)
    click.echo("> What's next?")
    click.echo("- Edit the config [ application/%s/config.py ] " % project)
    click.echo("- If necessary edit and run the manager [ python manage.py setup ]")
    click.echo("- Launch server, run [ webportfolio serve -p %s ]" % project)
    click.echo("")

@cli.command(name="build-assets")
@click.option("--project", "-p", default="www")
def build_assets(project):
    """
    Build application's assets files
    """

    from webassets.script import CommandLineEnvironment
    _title("Build application's assets files from bundles ...")
    click.echo("- Project: %s " % project)
    click.echo("")

    module = get_project_serve_module(project)
    app = module.app
    assets_env = app.jinja_env.assets_environment

    log = logging.getLogger('webassets')
    log.addHandler(logging.StreamHandler())
    log.setLevel(logging.DEBUG)

    cmdenv = CommandLineEnvironment(assets_env, log)
    cmdenv.build()

@cli.command()
@click.option("--project", "-p", default="www")
def assets2s3(project):
    """ To upload assets to S3"""

    import flask_s3

    _title("Upload assets files to S3 ...")
    click.echo("- Project: %s " % project)
    click.echo("")

    module = get_project_serve_module(project)
    app = module.app
    flask_s3.create_all(app)

@cli.command()
@click.option("--project", "-p", default="www")
@click.option("--port", default=5000)
def serve(project, port):
    """ Serve a project in Local Development environment
    """
    _title("Start server in DEV environment ...")
    click.echo("- Project: %s " % project)
    click.echo("- Port: %s" % port)
    click.echo("")

    module = get_project_serve_module(project)
    app = module.app

    extra_dirs = [CWD,]
    extra_files = extra_dirs[:]
    for extra_dir in extra_dirs:
        for dirname, dirs, files in os.walk(extra_dir):
            for filename in files:
                filename = os.path.join(dirname, filename)
                if os.path.isfile(filename):
                    extra_files.append(filename)
    app.run(debug=True, host='0.0.0.0', port=port, extra_files=extra_files)

#@cli.command()
#@click.option("--project", "-p", default="www")
def admin(project):
    app = get_project_serve_module(project).app
    manager = import_project_module("manage").manager()
    manager()
