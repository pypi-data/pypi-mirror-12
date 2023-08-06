#   Copyright 2010-2015 Josh Kearney
#
#   Licensed under the Apache License, Version 2.0 (the "License");
#   you may not use this file except in compliance with the License.
#   You may obtain a copy of the License at
#
#       http://www.apache.org/licenses/LICENSE-2.0
#
#   Unless required by applicable law or agreed to in writing, software
#   distributed under the License is distributed on an "AS IS" BASIS,
#   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#   See the License for the specific language governing permissions and
#   limitations under the License.

"""Pyhole Administration Plugin"""

from pyhole.core import plugin
from pyhole.core import utils


class Admin(plugin.Plugin):
    """Provide administration functionality"""

    @plugin.hook_add_command("help")
    def help(self, message, params=None, **kwargs):
        """Learn how to use active commands (ex: .help <command>)."""

        if params:
            doc = _find_doc_string(params)
            if doc:
                message.dispatch(doc)
            else:
                message.dispatch("No help available for '%s'" % params)
        else:
            message.dispatch(self.help.__doc__)
            message.dispatch("Active Commands: %s" % plugin.active_commands())
            message.dispatch("Active Keywords: %s" % plugin.active_keywords())

    @plugin.hook_add_command("version")
    def version(self, message, params=None, **kwargs):
        """Display the current version."""
        message.dispatch(self.session.version)

    @plugin.hook_add_command("reload")
    @utils.admin
    def reload(self, message, params=None, **kwargs):
        """Reload all plugins."""
        self.session.load_plugins(reload_plugins=True)
        message.dispatch("Loaded Plugins: %s" % plugin.active_plugins())

    @plugin.hook_add_command("op")
    @utils.admin
    def op(self, message, params=None, **kwargs):
        """Op a user (ex: .op <channel> <nick>)."""
        if params:
            self.session.op_user(params)
        else:
            message.dispatch(self.op.__doc__)

    @plugin.hook_add_command("deop")
    @utils.admin
    def deop(self, message, params=None, **kwargs):
        """De-op a user (ex: .deop <channel> <nick>)."""
        if params:
            self.session.deop_user(params)
        else:
            message.dispatch(self.deop.__doc__)

    @plugin.hook_add_command("nick")
    @utils.admin
    def nick(self, message, params=None, **kwargs):
        """Change nick (ex: .nick <nick>)."""
        if params:
            self.session.set_nick(params)
        else:
            message.dispatch(self.nick.__doc__)

    @plugin.hook_add_command("join")
    @utils.admin
    def join(self, message, params=None, **kwargs):
        """Join a channel (ex: .join #channel [<key>])."""
        if params:
            self.session.join_channel(params)
        else:
            message.dispatch(self.join.__doc__)

    @plugin.hook_add_command("part")
    @utils.admin
    def part(self, message, params=None, **kwargs):
        """Part a channel (ex: .part <channel>)."""
        if params:
            self.session.part_channel(params)
        else:
            message.dispatch(self.part.__doc__)

    @plugin.hook_add_command("say")
    @utils.admin
    def say(self, message, params=None, **kwargs):
        """Send a PRIVMSG (ex: .say <channel>|<nick> message)."""
        if params:
            (target, msg) = params.split(" ", 1)
            self.session.privmsg(target, msg)
        else:
            message.dispatch(self.say.__doc__)


def _find_doc_string(params):
    """Find the doc string for a plugin, command or keyword hook."""
    for p in plugin.active_plugin_classes():
        if p.__name__.upper() == params.upper():
            return p.__doc__

    for _, cmd_hook, cmd in plugin.hook_get_commands():
        if cmd.upper() == params.upper():
            return cmd_hook.__doc__

    for _, kw_hook, kw in plugin.hook_get_keywords():
        if kw.upper() == params.upper():
            return kw_hook.__doc__

    return None
