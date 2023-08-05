from requests import get as request
from bs4 import BeautifulSoup

__version__ = "0.20"

if __name__ != "__main__":
    from . import bs4parser
    from .nsexceptions import (
        NSError,
        NotFound,
        NationNotFound,
        RegionNotFound,
        APIError,
        CollectError,
        ShardError)


default_useragent = "NationStates Python API Wrapper V {version}".format(
    version=__version__)


class Shard(object):

    """Shard Object"""

    def __init__(self, shard, tags=None):
        if shard:
            self.__call__(shard, tags)

    def __call__(self, shard, tags=None):

        self.shardname = shard
        self.tags = tags
        self.islist = isinstance(self.tags, list)

    def __repr__(self):
        try:
            return ("(Shard: \'{ShardName}\', tags: {tags})"
                    ).format(ShardName=self.shardname,
                             tags=self.tags)
        except:
            raise ShardError("Shard Object Empty")

    def __str__(self):
        return self.shardname

    def tail_gen(self):
        """
        Generates the parameters for the url.

        """
        if isinstance(self.tags, dict):
            self.tags = [self.tags]
        if self.tags is not None and isinstance(self.tags, list):
            string = ""
            for x in self.tags:
                string += (self.create_tag_tail((
                    self.shardname,
                    x["tagtype"],
                    (str(x["tagvalue"]))))[:-1] + ';' if self.tags else "")
                setattr(self, x["tagtype"], x["tagvalue"])
            return string[:-1]
        else:
            return self.shardname

    def create_tag_tail(self, tag_tuple):
        _shard_, tag, tagvalue = tag_tuple
        return (tag + "=" + tagvalue + "+")

    def _get_main_value(self):
        return self.shardname


class ParserMixin(object):
    # Functions Dealing with the parser or parsing

    # Parses XML
    def xmlparser(self, _type_, xml):
        soup = (BeautifulSoup(xml, "html.parser"))
        if not soup.find("h1") is None:
            raise APIError(soup.h1.text)
        parsedsoup = bs4parser.parsetree(xml)

        return (soup, parsedsoup)


class RequestMixin(ParserMixin):

    # Methods used for creating and sending requests to the api

    def tail_generator(self, _type_, args, limit=None, StandardAPI=False):
        if StandardAPI:
            return "?" + _type_[0] + ("=" + _type_[1])
        string = "?" + \
            _type_[
                0] + ("=" + _type_[1] + "&q=") if (not _type_[0] == "world") else "?q="
        tailcollecter = ""
        for x in args:
            if not (isinstance(x, str)):  # Shard Objects
                string += (x._get_main_value() + "+")
                tailcollecter += (x.tail_gen() + ";")
            else:  # Strings
                string += (str(x) + "+")

        return string[:-1] + ";" + tailcollecter[:-1]

    def request(self, _type_, tail, user_agent=None, telegram_load=False, auth_load=False):
        """This handles all requests.

        :param _type_: Type of request

        :param tail: The result of ApiCall.tail_generator()

        :param user_agent: (optional) A user_agent.
            Will use the default one if not supplied

        :param limit: If supplied it will append a limit
            to the request

        """
        if user_agent is None:
            header = {"User-Agent": default_useragent}
        else:
            header = {"User-Agent": user_agent}
        url = ("https://www.nationstates.net/cgi-bin/api.cgi"
               + (tail[:-1] if tail[-1] == ";" else tail)
               + ("&v={v}".format(v=self.version) if self.version else ""))
        # request is a request.get() object
        data = request(
            url=url,
            headers=header)
        if telegram_load:
            return {
                "status": data.status_code,
                "request_instance": data
            }
        if auth_load:
            return {
                "is_auth": bool(int(data.text)) if data.status_code is "200" else False,
                "status": data.status_code,
                "request_instance": data
            }
        xml_parsed = self.xmlparser(_type_, data.text.encode("utf-8"))
        generated_data = {
            "status": data.status_code,
            "data": xml_parsed[1],
            "data_bs4": xml_parsed[0],
            "url": data.url,
            "request_instance": data,
            "version": self.version
        }
        return generated_data


class Api(RequestMixin):

    def __init__(
            self,
            _type_,
            value="NoValue",
            shard=None,
            user_agent=None,
            version=None):
        """
        Initializes the Api Object, sets up suppied shards for use.

        :param _type_: Supplies the type of request.
            (accepts "nation", "region", "world", "wa")

        :param value: (optional) Value for the api type.
            (Required for "nation", "region", "wa")
            No default value. If not supplied, it will return an error
            (unless _type_ is "world")

        :param shard: (optional) A set (list is also accepted) of shards.
            The set/list itself can include either strings and/or the
            Shard Object to represent shards

        :param version: (optional) a str that specify the version of the API to request.        

        calls __call__ method to make these values creatable during
            Initialization and also accept any changes
            when calling .__call__() on this object

        """

        self.__call__(_type_, value, shard, user_agent, version)

    def __call__(
            self,
            _type_,
            value="NoValue",
            shard=None,
            user_agent=None,
            version=None):
        """
        See Api.__init__()

        """

        self.type = (_type_, value)
        self.set_payload(shard)
        self.data = None
        self.user_agent = user_agent
        self.version = version

    def set_payload(self, shard):
        """
        Is called for Api.__init__() shard parameter.

        Can be used independent of the Initialization for changing shards

        :param shard: A set (list is also accepted) of shards. Accepts str and the Shard Object

        """

        if isinstance(shard, set):
            self.shard = shard
        elif isinstance(shard, list):
            self.shard = set(shard)
        else:
            self.shard = None

    def load(self, user_agent=None, telegram_load=False, auth_load=False):
        """
        Sends the request for the current _type_, value, and shard. 

        Special parameters are used for telegram requests
        """

        if self.user_agent is None and user_agent:
            self.user_agent = user_agent

        if telegram_load:
            self.data = self.request(
                self.type[0], self.type[1], user_agent=user_agent, telegram_load=True)

        if auth_load:
            self.data = self.request(
                self.type[0], self.type[1], user_agent=user_agent, telegram_load=True)

        if self.shard:
            self.data = self.request(
                self.type[0], self.tail_generator(
                    self.type, self.shard), self.user_agent)
            return self.data

        elif self.shard is None and self.type[0] in ["nation", "region"]:
            self.data = self.request(
                self.type[0], self.tail_generator(
                    self.type, self.shard, StandardAPI=True), self.user_agent)
            return self.data

        else:
            raise APIError("Invalid Shard(s) supplied: " + str(self.shard))

    def all_data(self):
        """
        Returns the result of ApiCall.request(), which returns a Dict

        """
        return self.data

    def get_data(self):
        "Returns the key ['data'] from self.data "

        return self.data.get("data", None)

    def collect(self):
        """
        Collects all the supplied shards. (Collects and Prettifies the result
            of bs4parser)
        """
        return self.get_data()
