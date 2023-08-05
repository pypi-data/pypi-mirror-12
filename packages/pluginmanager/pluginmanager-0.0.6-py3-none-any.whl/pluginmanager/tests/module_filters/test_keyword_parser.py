import types
import unittest

from pluginmanager.module_filters import KeywordParser


class TestKeywordParser(unittest.TestCase):
    def setUp(self):
        self.module_filter = KeywordParser()

    def test_get_plugin(self):
        keyword = self.module_filter.keywords[0]
        test_module = types.ModuleType("TestModule")
        test_obj = type('', (), {})
        set_plugins = [test_obj]
        setattr(test_module, keyword, set_plugins)
        plugins = self.module_filter.get_plugins(test_module)
        self.assertIn(test_obj, plugins)
