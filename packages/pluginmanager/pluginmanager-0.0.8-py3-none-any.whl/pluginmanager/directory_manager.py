import os
try:
    from site import getsitepackages
except ImportError:
    # getsitepackages is broken with virtualenvs
    # https://github.com/pypa/virtualenv/issues/355
    from distutils.sysconfig import get_python_lib as getsitepackages

from pluginmanager import util


class DirectoryManager(object):
    def __init__(self,
                 plugin_directories=set(),
                 recursive=True):

        if plugin_directories == set():
            plugin_directories = set()
            plugin_directories.add(os.path.dirname(__file__))

        self.plugin_directories = plugin_directories
        self.blacklisted_directories = set()
        self.recursive = recursive

    def add_directories(self, paths):
        paths = util.return_list(paths)
        unique_paths = set.union(set(paths), set(self.plugin_directories))
        self.plugin_directories = unique_paths

    def set_directories(self, paths):
        paths = util.return_list(paths)
        self.plugin_directories = set(paths)

    def add_site_packages_paths(self):
        self.add_directories(getsitepackages())

    def add_blacklisted_directories(self, directories):
        directories = set(util.return_list(directories))
        unique = set.union(directories, self.blacklisted_directories)
        self.blacklisted_directories = unique

    def set_blacklisted_directories(self, directories):
        directories = set(util.return_list(directories))
        self.blacklisted_directories = directories

    def get_blacklisted_directories(self):
        return self.blacklisted_directories

    def remove_blacklisted_directories(self, directories):
        directories = util.return_list(directories)
        for directory in directories:
            self.blacklisted_directories.remove(directory)

    def collect_directories(self, directories):
        directories = util.return_list(directories)
        if not self.recursive:
            return directories

        recursive_dirs = []
        for dir_ in directories:
            walk_iter = os.walk(dir_, followlinks=True)
            walk_iter = [w[0] for w in walk_iter]
            recursive_dirs.extend(walk_iter)
        return recursive_dirs

    def get_directories(self):
        self._plugin_dirs_to_absolute_paths()
        return self.plugin_directories

    def _plugin_dirs_to_absolute_paths(self):
        # alias out to meet <80 character line pep req
        abspath = os.path.abspath
        self.plugin_directories = [abspath(x) for x in self.plugin_directories]
        # casting to set removes dups, casting back to list for type
        self.plugin_directories = set(self.plugin_directories)
