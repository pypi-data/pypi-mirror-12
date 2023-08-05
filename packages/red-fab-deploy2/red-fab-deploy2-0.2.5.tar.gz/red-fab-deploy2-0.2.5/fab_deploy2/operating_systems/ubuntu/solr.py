import os

from fab_deploy2.base import solr as base_solr
from fab_deploy2.tasks import task_method
from fab_deploy2 import functions
from fabric.api import sudo, env


class Solr(base_solr.Solr):
    @task_method
    def start(self):
        functions.execute_on_host('utils.start_or_restart_service',
                                  name='tomcat6',
                                  host=[env.host_string])

    @task_method
    def stop(self):
        sudo('service tomcat6 stop')

    def _install_package(self):
        functions.execute_on_host(
            'utils.install_package', package_name='solr-tomcat')

    def _setup_logging(self):
        pass

    def _setup_dirs(self):
        pass

    def _setup_schema(self, template=None, directory=None):
        if not template:
            template = self.schema_template

        name = template.split('/')[-1]
        if directory:
            remote_schema_path = os.path.join(directory, name)
        else:
            remote_schema_path = self.remote_schema_path

        context = self.get_template_context()
        solr_schema = functions.render_template(template, context=context)
        sudo('ln -sf %s %s' % (solr_schema, remote_schema_path))

    def _setup_config(self, template=None, directory=None):
        if not template:
            template = self.config_template

        name = template.split('/')[-1]
        if directory:
            remote_config_path = os.path.join(directory, name)
        else:
            remote_config_path = self.remote_config_path

        context = self.get_template_context()
        solr_config = functions.render_template(template, context=context)
        sudo('ln -sf %s %s' % (solr_config, remote_config_path))


Solr().as_tasks()
