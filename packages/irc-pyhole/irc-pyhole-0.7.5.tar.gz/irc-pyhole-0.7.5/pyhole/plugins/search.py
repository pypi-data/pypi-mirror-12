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

"""Pyhole Search Plugin"""

import json
import re

from BeautifulSoup import BeautifulSoup

from pyhole.core import plugin
from pyhole.core import utils


class Search(plugin.Plugin):
    """Provide access to search engines"""

    @plugin.hook_add_command("google")
    @utils.spawn
    def google(self, message, params=None, **kwargs):
        """Search Google (ex: .g <query>)"""
        if params:
            url = "http://ajax.googleapis.com/ajax/services/search/web?v=1.0"
            response = utils.fetch_url(url, params={"q": params})
            if response.status_code != 200:
                return

            json_obj = json.loads(response.content)
            results = json_obj["responseData"]["results"]
            if results:
                for r in results:
                    message.dispatch("%s: %s" % (
                                     r["titleNoFormatting"]
                                     .encode("ascii", "ignore"),
                                     r["unescapedUrl"]))
            else:
                message.dispatch("No results found: '%s'" % params)
        else:
            message.dispatch(self.google.__doc__)

    @plugin.hook_add_command("g")
    def alias_g(self, message, params=None, **kwargs):
        """Alias of google."""
        self.google(message, params, **kwargs)

    @plugin.hook_add_command("urban")
    @utils.spawn
    def urban(self, message, params=None, **kwargs):
        """Search Urban Dictionary (ex: .urban <query>)"""
        if params:
            url = "http://www.urbandictionary.com/define.php"
            response = utils.fetch_url(url, params={"term": params})
            if response.status_code != 200:
                return

            soup = BeautifulSoup(response.content)

            try:
                meaning = soup.find("div", {"class": "meaning"}).text
                example = soup.find("div", {"class": "example"}).text
            except AttributeError:
                message.dispatch("No results found: '%s'" % params)

            meaning = utils.decode_entities(meaning)
            example = utils.decode_entities(example)

            message.dispatch("%s (ex: %s)" % (meaning, example))
        else:
            message.dispatch(self.urban.__doc__)

    @plugin.hook_add_command("wikipedia")
    @utils.spawn
    def wikipedia(self, message, params=None, **kwargs):
        """Search Wikipedia (ex: .wikipedia <query>)"""
        if params:
            url = "https://en.wikipedia.org/w/api.php"
            response = utils.fetch_url(url, params={
                "action": "query",
                "generator": "allpages",
                "gaplimit": 4,
                "gapfrom": params,
                "format": "json"
            })

            if response.status_code != 200:
                return

            pages = json.loads(response.content)["query"]["pages"]
            for page in pages.values():
                title = page["title"]
                title = re.sub(" ", "_", title)
                message.dispatch("http://en.wikipedia.org/wiki/%s" % title)
        else:
            message.dispatch(self.wikipedia.__doc__)

    @plugin.hook_add_command("wiki")
    def alias_wiki(self, message, params=None, **kwargs):
        """Alias of wikipedia."""
        self.wikipedia(message, params, **kwargs)
