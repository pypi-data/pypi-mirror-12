================
lovely.memcached
================

This package provides a utility that abstracts a client for memcached
servers see: http://www.danga.com/memcached.

IMPORTANT:

This test expects a memcache server running on local port 11211 which
is the default port for memcached.

This test runs in level 2 because it needs external resources to work. If you
want to run this test you need to use --all as parameter to your test.

Start a memcache instance with : memcached <optional options>

  >>> from lovely.memcached.utility import MemcachedClient
  >>> util = MemcachedClient()
  >>> util.servers
  ['127.0.0.1:11211']
  >>> util.defaultLifetime
  3600

To store a new value in the cache we just need to set it. The set
method returns the generated memcached key for the cache key.

  >>> util.set('cached value', 'cache_key')
  '188693688126b424eb89e1385eca6f01'
  >>> util.query('cache_key')
  'cached value'

If we no longer need the cached value we can invalidate it.

  >>> util.invalidate('cache_key')
  >>> util.query('cache_key') is None
  True

We have extended the original implementation on memcache.py for unicode.

  >>> key = util.set(u'cached value ���', 'cache_key')
  >>> util.query('cache_key') == u'cached value ���'
  True

We can invalidate the hole cache.

  >>> util.invalidateAll()
  >>> util.query('cache_key') is None
  True

Namespaces
==========

The utility provides the facility to use namespaces for keys in order
to let multiple utilities share the same memcached servers. A default
namespace can be set on the utility which is then used for any get and
query methods.

  >>> util1 = MemcachedClient(defaultNS=u'1')
  >>> util2 = MemcachedClient(defaultNS=u'2')
  >>> k = util1.set(1,1)
  >>> k = util2.set(2,2)
  >>> util1.query(1)
  1
  >>> util1.query(2) is None
  True
  >>> util1.query(2, ns=u'2')
  2
  >>> util2.query(2)
  2
  >>> util2.query(1) is None
  True

Note that if invalidatAll is called then all namespaces are deleted.

  >>> util1.invalidateAll()
  >>> util1.query(1) is util2.query(2) is None
  True

Getting existing keys
=====================

The memcached daemon does not provide the ability to retrieve a list
of all keys that are stored. In the utility this is implemented.

  >>> util1.keys()
  Traceback (most recent call last):
  ...
  NotImplementedError: trackKeys not enabled

The key tracking adds on overhead so it must be enabled explicitly.

  >>> util3 = MemcachedClient(trackKeys=True)
  >>> k = util3.set(1,1)
  >>> sorted(util3.keys())
  [1]
  >>> k = util3.set(2,2)
  >>> sorted(util3.keys())
  [1, 2]

Keys are global on memcached daemons. In order to test this we need to
have multiple threads.

  >>> import threading
  >>> log = []

Each thread has a different connection and uid.

  >>> def differentConn():
  ...     util3.set(3,3)
  ...     log.append((sorted(util3.keys()), util3.storage.uid))
  ...
  >>> thread = threading.Thread(target=differentConn)
  >>> thread.start()
  >>> thread.join()
  >>> log
  [([1, 2, 3], '...-...-...')]

Each key aware utility has its own uid per thread.

  >>> util4 = MemcachedClient(trackKeys=True)
  >>> util4.storage.uid != log[0][1]
  True

Keys expire too

  >>> k = util3.set(4, 4, lifetime=1)
  >>> sorted(util3.keys())
  [1, 2, 3, 4]
  >>> import time
  >>> time.sleep(2)
  >>> sorted(util3.keys())
  [1, 2, 3]
  >>> util3.query(4) is None
  True

Keys are always bound to a namespace.

  >>> k = util3.set(5, 5, ns=u'3')

If not give the ``None`` namespace is used.

  >>> sorted(util3.keys())
  [1, 2, 3]
  >>> sorted(util3.keys(u'3'))
  [5]

When an invalidation is done, the keys are updated.

  >>> util3.invalidate(1)
  >>> sorted(util3.keys())
  [2, 3]

This is just for an internal test, it updates the key records on the
server.

  >>> util3._keysUpdate([1,2], u'speed')


Raw Keys
========

Normaly the utility generates md5 hash keys in order to have short
keys. Sometimes, if an axternal application wants to have access to
the values, it is usefull to be able to set keys explicitly. This can
be done by setting the raw keyword argument to True on the set
and query methods.

If raw is used, the value must be a string.

  >>> k = util.set('value of a', u'a', raw=True)
  Traceback (most recent call last):
  ...
  ValueError: u'a'

  >>> util.set('value of a', 'a', raw=True)
  'a'

The namespace is simply prepended to the key if provided. And must be
a string too.

  >>> util.set('value of a', 'a', ns=u'NS_', raw=True)
  Traceback (most recent call last):
  ...
  ValueError: u'NS_a'

  >>> util.set('value of a', 'a', ns='NS_', raw=True)
  'NS_a'

  
Now we need can get the value with the raw key. Note also the value
was treated as a string, so we get a string back instead of a unicode.

  >>> util.query('a', raw=True)
  'value of a'
  >>> util.query('a', raw=False) is None
  True

Also invalidation takes a raw argument.

  >>> util.invalidate('a')
  >>> util.query('a', raw=True)
  'value of a'
  >>> util.invalidate('a', raw=True)
  >>> util.query('a', raw=True) is None
  True

Dependencies
============

It is possible to declare arbitrary python objects as so called
dependencies upon setting a cache value. These dependencies can then
be used to invalidate entries.

  >>> util5 = MemcachedClient()
  >>> k = util5.set('data1', 'key1', dependencies=['something'])
  >>> k = util5.set('data2', 'key2', dependencies=['something'], raw=True)

We have an entry in memcache which holds the list of dependencies.

  >>> depKey = util5._buildDepKey('something', util5._getNS(None, False))
  >>> util5.query(depKey, raw=True)
  ('19192ccdbb8267c35b9bdaf2f1f5594b', 'key2')

  >>> util5.query('key1')
  'data1'
  >>> util5.query('key2', raw=True)
  'data2'

Invalitating a non existing invalidation key keeps the existing entries in the
cache.

  >>> util.invalidate(dependencies=['otherthing'])
  >>> util5.query('key1')
  'data1'
  >>> util5.query('key2', raw=True)
  'data2'

Also the dependency list is unchanged.

  >>> util5.query(depKey, raw=True)
  ('19192ccdbb8267c35b9bdaf2f1f5594b', 'key2')

Now invalidating with an existing key removes our cache entries and also the
dependency entry.

  >>> util.invalidate(dependencies=['something', 'another thing'])
  >>> util5.query('key1') is None
  True
  >>> util5.query('key2', raw=True) is None
  True
  >>> util5.query(depKey, raw=True) is None
  True

  >>> k = util5.set('data3', 'key3', ns='1', dependencies=['something'])
  >>> util.invalidate(dependencies=['something'])
  >>> util5.query('key3', ns='1')
  'data3'
  >>> util.invalidate(ns='1', dependencies=['something'])
  >>> util5.query('key3', ns='1') is None
  True


Statistics
==========

This returns the stats for each server connected.

  >>> util.getStatistics()
  [('127.0.0.1:11211 (1)', {...'total_items':...]

If we use a server which doesn't exist we can still use the cache but noting
will be stored. This behaviour allows us to run without a connected memcache
server. As soon as a server is back online it will immediately used.

  >>> util.servers = ['127.0.0.1:8125']
  >>> k = util.set('cached value', 'cache_object')
  >>> util.query('cache_object') is None
  True
  >>> util.set('notStored', 'ignored') is None
  True


Invalidationevents
==================

Events can be used to create invalidations. The event handler invalidates in
registered memcached utilities.

  >>> from zope import event
  >>> from zope import component
  >>> from lovely.memcached.interfaces import IMemcachedClient
  >>> cacheUtil1 = MemcachedClient()
  >>> component.provideUtility(cacheUtil1, IMemcachedClient, name='cacheUtil1')
  >>> cacheUtil1.set('Value1', 'key1', dependencies=['dep1'])
  '19192ccdbb8267c35b9bdaf2f1f5594b'

  >>> cacheUtil1.query('key1')
  'Value1'

  >>> from lovely.memcached.event import invalidateCache
  >>> component.provideHandler(invalidateCache)

  >>> from lovely.memcached.event import InvalidateCacheEvent
  >>> event.notify(InvalidateCacheEvent(dependencies=['dep1']))
  >>> cacheUtil1.query('key1') is None
  True

With more than one memcache utility we can invalidate in all utilities.

  >>> from lovely.memcached.testing import TestMemcachedClient
  >>> cacheUtil2 = TestMemcachedClient()
  >>> component.provideUtility(cacheUtil2, IMemcachedClient, name='cacheUtil2')
  >>> key = cacheUtil1.set('Value1', 'key1', raw=True, dependencies=['dep1'])
  >>> key = cacheUtil2.set('Value2', 'key2', dependencies=['dep1'])
  >>> event.notify(InvalidateCacheEvent(dependencies=['dep1']))
  >>> cacheUtil1.query('key1') is None
  True
  >>> cacheUtil2.query('key2') is None
  True

Or we specify in which memcache we want to invalidate.

  >>> key = cacheUtil1.set('Value1', 'key1', raw=True, dependencies=['dep1'])
  >>> key = cacheUtil2.set('Value2', 'key2', dependencies=['dep1'])
  >>> event.notify(InvalidateCacheEvent(cacheName='cacheUtil1',
  ...                                   dependencies=['dep1']))
  >>> cacheUtil1.query('key1') is None
  True
  >>> cacheUtil2.query('key2') is None
  False

  >>> key = cacheUtil1.set('Value1', 'key1', ns='test', raw=False, dependencies=['dep1'])
  >>> cacheUtil1.query('key1', ns='test', raw=False)
  'Value1'
  >>> event.notify(InvalidateCacheEvent(cacheName='cacheUtil1',
  ...                                   dependencies=['dep1']))
  >>> cacheUtil1.query('key1', ns='test', raw=False)
  'Value1'
  >>> event.notify(InvalidateCacheEvent(cacheName='cacheUtil1',
  ...                                   ns='test',
  ...                                   dependencies=['dep1']))
  >>> cacheUtil1.query('key1', ns='test', raw=False) is None
  True

