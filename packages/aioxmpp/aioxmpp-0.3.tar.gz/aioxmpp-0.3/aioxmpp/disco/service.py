import asyncio
import itertools

import aioxmpp.errors as errors
import aioxmpp.service as service
import aioxmpp.structs as structs
import aioxmpp.stanza as stanza

from aioxmpp.utils import namespaces

from . import xso as disco_xso


class Node(object):
    """
    A :class:`Node` holds the information related to a specific node within the
    entity referred to by a JID, with respect to XEP-0030 semantics.

    A :class:`Node` always has at least one identity (or it will return
    as ``<item-not-found/>``). It may have zero or more features beyond the
    XEP-0030 features which are statically included.

    To manage the identities and the features of a node, use the following
    methods:

    .. automethod:: register_feature

    .. automethod:: unregister_feature

    .. automethod:: register_identity

    .. automethod:: unregister_identity

    To access the declared features and identities, use:

    .. automethod:: iter_features

    .. automethod:: iter_identities

    To access items, use:

    .. automethod:: iter_items

    As mentioned, bare :class:`Node` objects have no items; there are
    subclasses of :class:`Node` which support items:

    ===================  ==================================================
    :class:`StaticNode`  Support for a list of :class:`.xso.Item` instances
    :class:`Service`     Support for "mountpoints" for node subtrees
    ===================  ==================================================

    """
    STATIC_FEATURES = frozenset({namespaces.xep0030_info})

    def __init__(self):
        super().__init__()
        self._identities = {}
        self._features = set()

    def iter_identities(self):
        """
        Return an iterator which yields tuples consisting of the category, the
        type, the language code and the name of each identity declared in this
        :class:`Node`.

        Both the language code and the name may be :data:`None`, if no names or
        a name without language code have been declared.
        """
        for (category, type_), names in self._identities.items():
            for lang, name in names.items():
                yield category, type_, lang, name
            if not names:
                yield category, type_, None, None

    def iter_features(self):
        """
        Return an iterator which yields the `var` values of each feature
        declared in this :class:`Node`, including the statically declared
        XEP-0030 features.
        """
        return itertools.chain(
            iter(self.STATIC_FEATURES),
            iter(self._features)
        )

    def iter_items(self):
        """
        Return an iterator which yields the :class:`.xso.Item` objects which
        this node holds.

        A bare :class:`Node` cannot hold any items and will thus return an
        iterator which does not yield any element.
        """
        return iter([])

    def register_feature(self, var):
        """
        Register a feature with the namespace variable `var`.

        If the feature is already registered or part of the default XEP-0030
        features, a :class:`ValueError` is raised.
        """
        if var in self._features or var in self.STATIC_FEATURES:
            raise ValueError("feature already claimed: {!r}".format(var))
        self._features.add(var)

    def register_identity(self, category, type_, *, names={}):
        """
        Register an identity with the given `category` and `type_`.

        If there is already a registered identity with the same `category` and
        `type_`, :class:`ValueError` is raised.

        `names` may be a mapping which maps :class:`.structs.LanguageTag`
        instances to strings. This mapping will be used to produce
        ``<identity/>`` declarations with the respective ``xml:lang`` and
        ``name`` attributes.
        """
        key = category, type_
        if key in self._identities:
            raise ValueError("identity already claimed: {!r}".format(key))
        self._identities[key] = names

    def unregister_feature(self, var):
        """
        Unregister a feature which has previously been registered using
        :meth:`register_feature`.

        If the feature has not been registered previously, :class:`KeyError` is
        raised.

        .. note::

           The features which are mandatory per XEP-0030 are always registered
           and cannot be unregistered. For the purpose of unregistration, they
           behave as if they had never been registered; for the purpose of
           registration, they behave as if they had been registered before.

        """
        self._features.remove(var)

    def unregister_identity(self, category, type_):
        """
        Unregister an identity previously registered using
        :meth:`register_identity`.

        If no identity with the given `category` and `type_` has been
        registered before, :class:`KeyError` is raised.

        If the identity to remove is the last identity of the :class:`Node`,
        :class:`ValueError` is raised; a node must always have at least one
        identity.
        """
        key = category, type_
        if key not in self._identities:
            raise KeyError(key)
        if len(self._identities) == 1:
            raise ValueError("cannot remove last identity")
        del self._identities[key]


class StaticNode(Node):
    """
    A :class:`StaticNode` is a :class:`Node` with a non-dynamic set of items.

    .. attribute:: items

       A list of :class:`.xso.Item` instances. These items will be returned
       when the node is queried for it’s XEP-0030 items.

       It is the responsibility of the user to ensure that the set of items is
       valid. This includes avoiding duplicate items.

    """

    def __init__(self):
        super().__init__()
        self.items = []

    def iter_items(self):
        return iter(self.items)


class Service(service.Service, Node):
    """
    A service implementing XEP-0030. The service provides methods for managing
    the own features and identities as well as querying others features and
    identities.

    Querying other entities’ service discovery information:

    .. automethod:: query_info

    Services inherit from :class:`Node` to manage the identities and features
    of the JID itself. The identities and features declared in the service
    using the :class:`Node` interface on the :class:`Service` instance are
    returned when a query is received for the JID with an empty or unset
    ``node`` attribute. For completeness, the relevant methods are listed
    here. Refer to the :class:`Node` documentation for details.

    .. autosummary::

       Node.register_feature
       Node.unregister_feature
       Node.register_identity
       Node.unregister_identity

    .. note::

       Upon construction, the :class:`Service` adds a default identity with
       category ``"client"`` and type ``"bot"`` to the root :class:`Node`. This
       is to comply with XEP-0030 of always having an identity and not being
       forced to reply with ``<feature-not-implemented/>`` or a similar error.

       After having added another identity, that default identity can be
       removed.


    Usage example, assuming that you have a :class:`.node.AbstractClient`
    `node`::

      import aioxmpp.disco as disco
      # load service into node
      sd = node.summon(disco.Service)

      # retrieve server information
      server_info = yield from sd.query_info(
          node.local_jid.replace(localpart=None, resource=None)
      )

      # retrieve resources
      resources = yield from sd.query_items(
          node.local_jid.bare()
      )

    """

    def __init__(self, client, *, logger=None):
        super().__init__(client, logger=logger)

        self._info_pending = {}
        self._items_pending = {}

        self._node_mounts = {
            None: self
        }

        self.register_identity(
            "client", "bot",
            names={
                structs.LanguageTag.fromstr("en"): "aioxmpp default identity"
            }
        )

        self.client.stream.register_iq_request_coro(
            "get",
            disco_xso.InfoQuery,
            self.handle_info_request)

        self.client.stream.register_iq_request_coro(
            "get",
            disco_xso.ItemsQuery,
            self.handle_items_request)

        self.client.on_stream_destroyed.connect(
            self._clear_cache
        )

    @asyncio.coroutine
    def _shutdown(self):
        self.client.stream.unregister_iq_request_coro(
            "get",
            disco_xso.InfoQuery)
        yield from super()._shutdown()

    def _clear_cache(self):
        for fut in self._info_pending.values():
            if not fut.done():
                fut.cancel()
        self._info_pending.clear()

        for fut in self._items_pending.values():
            if not fut.done():
                fut.cancel()
        self._items_pending.clear()

    def mount_node(self, mountpoint, node):
        self._node_mounts[mountpoint] = node

    @asyncio.coroutine
    def handle_info_request(self, iq):
        request = iq.payload

        try:
            node = self._node_mounts[request.node]
        except KeyError:
            raise errors.XMPPModifyError(
                condition=(namespaces.stanzas, "item-not-found")
            )

        response = disco_xso.InfoQuery()

        for category, type_, lang, name in node.iter_identities():
            response.identities.append(disco_xso.Identity(
                category=category,
                type_=type_,
                lang=lang,
                name=name
            ))

        if not response.identities:
            raise errors.XMPPModifyError(
                condition=(namespaces.stanzas, "item-not-found"),
            )

        for feature in node.iter_features():
            response.features.append(disco_xso.Feature(
                var=feature
            ))

        return response

    @asyncio.coroutine
    def handle_items_request(self, iq):
        request = iq.payload

        try:
            node = self._node_mounts[request.node]
        except KeyError:
            raise errors.XMPPModifyError(
                condition=(namespaces.stanzas, "item-not-found")
            )

        response = disco_xso.ItemsQuery()
        response.items.extend(node.iter_items())

        return response

    @asyncio.coroutine
    def query_info(self, jid, *, node=None, require_fresh=False, timeout=None):
        """
        Query the features and identities of the specified entity. The entity
        is identified by the `jid` and the optional `node`.

        Return the :class:`.xso.InfoQuery` instance returned by the peer. If an
        error is returned, that error is raised as :class:`.errors.XMPPError`.

        The requests are cached. This means that only one request is ever fired
        for a given target (identified by the `jid` and the `node`). The
        request is re-used for all subsequent requests to that identity.

        If `require_fresh` is set to true, the above does not hold and a fresh
        request is always created. The new request is the request which will be
        used as alias for subsequent requests to the same identity.

        The visible effects of this are twofold:

        * Caching: Results of requests are implicitly cached
        * Aliasing: Two concurrent requests will be aliased to one request to
          save computing resources

        Both can be turned off by using `require_fresh`. In general, you should
        not need to use `require_fresh`, as all requests are implicitly
        cancelled whenever the underlying session gets destroyed.

        `timeout` is passed to
        :meth:`.StanzaStream.send_iq_and_wait_for_reply`.
        """
        key = jid, node

        if not require_fresh:
            try:
                request = self._info_pending[key]
            except KeyError:
                pass
            else:
                try:
                    return (yield from request)
                except asyncio.CancelledError:
                    pass

        request_iq = stanza.IQ(to=jid, type_="get")
        request_iq.payload = disco_xso.InfoQuery(node=node)

        request = asyncio.async(
            self.client.stream.send_iq_and_wait_for_reply(request_iq)
        )

        self._info_pending[key] = request
        if timeout is not None:
            try:
                result = yield from asyncio.wait_for(request, timeout=timeout)
            except asyncio.TimeoutError:
                raise TimeoutError()
        else:
            result = yield from request

        return result

    @asyncio.coroutine
    def query_items(self, jid, *, node=None, require_fresh=False, timeout=None):
        key = jid, node

        if not require_fresh:
            try:
                request = self._items_pending[key]
            except KeyError:
                pass
            else:
                try:
                    return (yield from request)
                except asyncio.CancelledError:
                    pass

        request_iq = stanza.IQ(to=jid, type_="get")
        request_iq.payload = disco_xso.ItemsQuery(node=node)

        request = asyncio.async(
            self.client.stream.send_iq_and_wait_for_reply(request_iq)
        )

        self._items_pending[key] = request
        if timeout is not None:
            try:
                result = yield from asyncio.wait_for(request, timeout=timeout)
            except asyncio.TimeoutError:
                raise TimeoutError()
        else:
            result = yield from request

        return result
