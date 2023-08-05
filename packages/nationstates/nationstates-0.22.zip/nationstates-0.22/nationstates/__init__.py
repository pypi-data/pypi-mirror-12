from time import time as timestamp
from time import sleep
import warnings
if __name__ != "__main__":
    from . import NScore
    from .NScore import nsexceptions
else:
    import NScore

# this is used in nationstates get_??? methods
__apiversion__ = "7"


class Shard(NScore.Shard):

    """Inherits from NScore Shard"""

    @property
    def name(self):
        return self._get_main_value()


class NSPropertiesMixin(object):

    """Properties for attributes that need
    extra processing"""

    @property
    def value(self):
        return self._value_store

    @value.setter
    def value(self, val):
        self._value_store = val
        self.api_instance.type = (self.api, self.value)

    @property
    def shard(self):
        return self._shard_store

    @shard.setter
    def shard(self, val):
        self._shard_store = val
        self.api_instance.set_payload(self.shard)

    @property
    def user_agent(self):
        return self._user_agent_store

    @user_agent.setter
    def user_agent(self, val):
        self._user_agent_store = val
        self.api_instance.user_agent = self.user_agent

    @property
    def version(self):
        return self._version_store

    @version.setter
    def version(self, val):
        self._version_store = val
        self.api_instance.version = val


class NSSettersMixin(object):

    """This allows a more tradition creation and editing of
    Nationstates Objects"""

    def set_value(self, value):
        self.value = value
        return self

    def set_shard(self, shards):
        self.shard = self.shard_handeler(shards)
        return self

    def set_useragent(self, useragent):
        self.user_agent = useragent
        return self

    def set_version(self, v):
        self.version = v
        return self


class Nationstates(NSPropertiesMixin, NSSettersMixin):

    """
    Api object

    This Wraps around the NScore.Api Object.

    """

    def __init__(self, api, value=None, shard=None,
                 user_agent=None, auto_load=False, version=None):
        """
        Passes on the arguments to self.__call__()

        Creates the variable self.collect and self.has_data
        """

        self.collect_data = None
        self.has_data = False
        self.rltime = []

        self.__call__(api, value, shard, user_agent, auto_load, version)

    def __call__(self, api, value=None, shard=None,
                 user_agent=None, auto_load=False, version=None):
        """
        Handles the arguments and sends the args to be parsed

        Then sets up a NScore.Api instance (api_instance) that this object
             will interact with

        :param api: The type of API being accesses
            ("nation", "region", "world", "wa")

        :param value: The value of the API type (For the example,
            the nation to search when using "nation")

        :param shard: A list (preferablly set) of nationstate shards that
            NScore uses to both request and parse data from nationstates)

        :param user_agent: A custom useragent if needed. The Nationstates
            Module has a defualt message if this is left blank.

        :param auto_load: if a user_agent is supplied and this is set to True

        """

        if not api in ("nation", "region", "world", "wa", "verify"):
            raise nsexceptions.ApiTypeError("Invalid api type: {}".format(api))

        # NScore
        # This needs to be created at the start of the run
        self.api = api
        self.api_instance = NScore.Api(self.api)

        if self.has_data:
            self.collect_data = None

        self.value = value
        self.shard = shard
        self.user_agent = user_agent
        self.has_data = False  # If the .__call__() is called)
        self.version = version

        if auto_load and self.user_agent:
            return self.load()
        else:
            if auto_load and not self.user_agent:
                raise nsexceptions.NSError(
                    "user_agent required for on-creation requests")
            return self

    def __repr__(self):
        return "Nationstates(API: {type}, value: {value})".format(
            type=self.api,
            value=self.value)

    def __getitem__(self, key):
        try:
            if self.collect_data is None:
                raise nsexceptions.CollectError(
                    "Api instance must be collected to be accessed")
            if key is self.api:
                return self.collect()
            return self.collect()[key]
        except KeyError as err:
            raise err
        except nsexceptions.NSError as err:
            raise err

    def __getattr__(self, attr):
        if self.has_data:
            if attr in self.collect().keys():
                return self.collect()[attr]
        raise AttributeError('\'%s\' has no attribute \'%s\'' % (type(self),
                                                                 attr))

    def shard_handeler(self, shard):
        if not isinstance(shard, list):
            return list(shard)
        else:
            return shard

    def load(self, user_agent=None, no_ratelimit=False,
             retry_after=1, numattempt=3):

        if not (user_agent or self.user_agent):
            print("Warning: No user-agent set, default will be used.")
        if user_agent:
            self.user_agent = user_agent
        if self.ratelimitcheck() or no_ratelimit:
            self.rltime = [timestamp()] + self.rltime
            self.has_data = self.api_instance.load(user_agent=self.user_agent)
            if self.has_data:
                self.collect_data = None
                return self
            else:
                raise nsexceptions.APIError(
                    "Nationstates API requested failed.\nStatus Code: {status}"
                    .format(status=self.data["status"])
                )
                return self
        elif not no_ratelimit:
            attemptsleft = numattempt
            while not self.ratelimitcheck():
                if numattempt == 0:
                    raise NScore.RateLimitCatch(
                        "Rate Limit Protection Blocked this Request")
                sleep(retry_after)
                self.load(
                    user_agent=self.user_agent, numattempt=attemptsleft-1)
                if self.has_data:
                    return self
            # In the rare case where the ratelimiterf
            if self.has_data and self.ratelimitcheck():
                return self   # is within a narrow error prone zone
            raise NScore.RateLimitCatch(
                "Rate Limit Protection Blocked this Request")

    def ratelimitcheck(self, amount_allow=49, within_time=30):
        if len(self.rltime) >= amount_allow:
            currenttime = timestamp()
            while (self.rltime[-1]+within_time) < currenttime:
                del self.rltime[-1]
            if len(self.rltime) >= amount_allow:
                return False
            else:
                return True

        else:
            return True

    def collect(self):
        if self.collect_data:
            return self.collect_data[self.api]
        else:
            self.collect_data = (self.api_instance.collect())
            return self.collect_data[self.api]

    def full_collect(self):
        if self.collect_data:
            return self.collect_data
        else:
            self.collect()
        return self.collect_data

    @property
    def data(self):
        return self.api_instance.all_data()

    @property
    def url(self):
        if not self.data:
            return self.api_instance.get_url()
        else:
            return self.data["url"]


class Api(Nationstates):

    def __init__(self, api, value=None, shard=None,
                 user_agent=None, auto_load=False, version=None):
        warnings.warn(
            "Api has been renamed to Natonstates", DeprecationWarning)
        super(Api, self).__init__(
            api, value, shard, user_agent, auto_load, version)


class Telegram(object):

    """
    Telegram uses the NScore.Api object to make a telegram request.

    :param to: The Target nation or recipient

    :param client_key: The API key - Obtained through requesting one
        from the NS Moderators

    :param tgid: Seemily the meta information that Nationstates uses
        to get and send a message. Obtained through
        sending a message (in nationstates) with tag:api as the recipient

    :param secret_key: Seemily the meta information that Nationstates
        uses to get and send a message. Obtained through sending
        a message (in nationstates) with tag:api as the recipient
    """

    def __init__(self, to=None, client_key=None, tgid=None,
                 secret_key=None, auto_send=False,
                 user_agent=NScore.default_useragent):

        self.__call__(to, client_key, tgid, secret_key, auto_send)

    def __call__(self, to=None, client_key=None, tgid=None,
                 secret_key=None, auto_send=False,
                 user_agent=None):
        """
        Setups a NScore.Api() instance in a way that will send a telegram.
        """

        self._user_agent = user_agent
        self.api_instance = (
            NScore.Api(
                "a",
                value=("?a=sendTG" +
                       "&client={}&".format(client_key) +
                       "tgid={}&".format(tgid) +
                       "key={}&".format(secret_key) +
                       "to={}".format(to)),
                shard=[""],
            )
        )
        if auto_send:
            self.send

    def user_agent(self, user_agent):
        self._user_agent = user_agent
        self.api_instance.user_agent = user_agent
        return self

    def send(self, user_agent=None, return_meta=False):
        """Sends the telegram"""
        if user_agent:
            self.user_agent(user_agent)
        elif self._user_agent:
            self.user_agent(self.user_agent)
        elif not self.user_agent:
            self.user_agent(NScore.default_useragent)
        self.api_instance.load(telegram_load=True)
        if self.api_instance.data["status"] == "200":
            return True
        return False


def get(api, value=None, user_agent=NScore.default_useragent,
        shard=None, v="7", auto_load=True):
    if isinstance(shard, str):
        shard = {shard, }
    if user_agent == None or user_agent == NScore.default_useragent:
        print("Warning: No user-agent set, default will be used")
    return Nationstates(api,
                        value=value,
                        user_agent=user_agent,
                        shard=shard,
                        version=v,
                        auto_load=auto_load)


def get_nation(nation, shard=None, user_agent=NScore.default_useragent,
               v=__apiversion__, auto_load=True):
    return get("nation", nation, user_agent, shard,
               v, auto_load)


def get_region(region, shard=None,  user_agent=NScore.default_useragent,
               v=__apiversion__, auto_load=True):
    return get("region", region, user_agent, shard,
               v, auto_load)


def get_world(shard=None, user_agent=NScore.default_useragent,
              v=__apiversion__, auto_load=True):
    return get("world", None, user_agent, shard,
               v, auto_load)


def get_wa(wa, shard=None, user_agent=NScore.default_useragent,
           v=__apiversion__, auto_load=True):
    return get("wa", wa, user_agent, shard,
               v, auto_load)
