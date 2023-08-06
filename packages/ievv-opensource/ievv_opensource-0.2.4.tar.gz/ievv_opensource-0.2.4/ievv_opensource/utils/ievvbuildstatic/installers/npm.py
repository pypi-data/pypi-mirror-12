import json
from ievv_opensource.utils.ievvbuildstatic.installers.base import AbstractInstaller
from ievv_opensource.utils.ievvbuildstatic.shellcommand import ShellCommandError


class NpmInstaller(AbstractInstaller):
    name = 'npminstall'

    def __init__(self, *args, **kwargs):
        super(NpmInstaller, self).__init__(*args, **kwargs)
        self.queued_packages = {}

    # def get_packageinfo(self):
    #     package_json = self.app.get_source_path('package.json')
    #     if os.path.exists(package_json):
    #         json.loads(package_json)
    #     else:
    #         return None
    #
    # def get_installed_package_version(self, package):
    #     packageinfo = self.get_packageinfo()
    #     if packageinfo:
    #         return packageinfo.get('devDependencies', {}).get(package, None)
    #     else:
    #         return None

    def queue_install(self, package, version=None):
        """
        Installs the given npm package in the build
        directory for the app.

        Does nothing if the package is already installed.
        """
        if not version:
            version = '*'
        self.get_logger().info('Queued install of %s (version=%s) for %s',
                               package, version, self.app.appname)
        self.queued_packages[package] = version

    def get_packagejson_path(self):
        return self.app.get_source_path('package.json')

    def create_packagejson(self):
        packagedata = {
            'name': self.app.appname,
            'version': '1.0.0',
            'devDependencies': self.queued_packages
        }
        open(self.get_packagejson_path(), 'wb').write(
            json.dumps(packagedata, indent=2).encode('utf-8'))

    def install(self):
        self.get_logger().info('Running npm install for %s',
                               self.app.get_source_path())
        self.create_packagejson()
        try:
            self.run_shell_command('npm',
                                   args=['install'],
                                   kwargs={
                                       '_cwd': self.app.get_source_path()
                                   })
        except ShellCommandError:
            self.get_logger().exception('npm install failed.')
            raise SystemExit()
        else:
            self.get_logger().info('Build successful!')

    def find_executable(self, executablename):
        """
        Find an executable named ``executablename``.

        Returns the absolute path to the executable.
        """
        executablepath = self.app.get_source_path(
            'node_modules', '.bin', executablename)
        return executablepath
