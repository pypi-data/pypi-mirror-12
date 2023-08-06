All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

 * Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.
 * Neither the name of the tredis library nor the names of its
   contributors may be used to endorse or promote products derived from this
   software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE
OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

Description: TRedis
        ======
        An asynchronous Redis client for Tornado
        
        |Version| |Downloads| |PythonVersions| |Status| |Coverage| |CodeClimate| |QuantifiedCode|
        
        Documentation is available at `tredis.readthedocs.org <http://tredis.readthedocs.org>`_.
        
        Commands Implemented
        --------------------
        TRedis is a work in progress and not all commands are implemented. The following
        list details each command category and the number of commands implemented in each.
        
        If you need functionality that is not yet implemented, follow the patterns for
        the category mixins that are complete and submit a PR!
        
        +--------------+----------+
        | Category     | Count    |
        +==============+==========+
        | Cluster      | 0 of 20  |
        +--------------+----------+
        | Connection   | 5 of 5   |
        +--------------+----------+
        | Geo          | 0 of 6   |
        +--------------+----------+
        | Hashes       | 0 of 15  |
        +--------------+----------+
        | HyperLogLog  | 3 of 3   |
        +--------------+----------+
        | Keys         | 22 of 22 |
        +--------------+----------+
        | Lists        | 0 of 17  |
        +--------------+----------+
        | Pub/Sub      | 0 of 6   |
        +--------------+----------+
        | Scripting    | 0 of 6   |
        +--------------+----------+
        | Server       | 0 of 30  |
        +--------------+----------+
        | Sets         | 15 of 15 |
        +--------------+----------+
        | Sorted Sets  | 0 of 21  |
        +--------------+----------+
        | Strings      | 23 of 23 |
        +--------------+----------+
        | Transactions | 0 of 5   |
        +--------------+----------+
        
        For information on local development or contributing, see `CONTRIBUTING.rst <CONTRIBUTING.rst>`_
        
        Example
        -------
        
        .. code:: python
        
           client = tredis.RedisClient()
        
           yield client.set('foo', 'bar')
           value = yield client.get('foo')
        
        Pipelining
        ----------
        tredis supports pipelining in a different way than other redis clients. To use
        pipelining, simply call the ``tredis.RedisClient.pipeline_start()`` method,
        then invoke all of the normal commands without yielding to them. When you have
        created the pipeline, execute it with ``tredis.RedisClient.pipeline_execute()``:
        
        .. code:: python
        
           client = tredis.RedisClient()
        
           # Start the pipeline
           client.pipeline_start()
        
           client.set('foo1', 'bar1')
           client.set('foo2', 'bar2')
           client.set('foo3', 'bar3')
           client.get('foo1')
           client.get('foo2')
           client.get('foo3')
           client.incr('foo4')
           client.incr('foo4')
           client.get('foo4')
        
           # Execute the pipeline
           responses = yield client.pipeline_execute()
        
           # The expected responses should match this list
           assert responses == [True, True, True, b'bar1', b'bar2', b'bar3', 1, 2, b'2']
        
        .. warning:: Yielding after calling ``RedisClient.pipeline_start()`` and before
         calling ``yield RedisClient.pipeline_execute()`` can cause asynchronous request
         scope issues, as the client does not protect against other asynchronous requests
         from populating the pipeline. The only way to prevent this from happening is
         to make all pipeline additions inline without yielding to the ``IOLoop``.
        
        .. |Version| image:: https://img.shields.io/pypi/v/tredis.svg?
           :target: https://pypi.python.org/pypi/tredis
        
        .. |PythonVersions| image:: https://img.shields.io/pypi/pyversions/tredis.svg?
           :target: https://github.com/gmr/tredis
        
        .. |Status| image:: https://img.shields.io/travis/gmr/tredis.svg?
           :target: https://travis-ci.org/gmr/tredis
        
        .. |Coverage| image:: https://img.shields.io/codecov/c/github/gmr/tredis.svg?
           :target: https://codecov.io/github/gmr/tredis?branch=master
        
        .. |Downloads| image:: https://img.shields.io/pypi/dm/tredis.svg?
           :target: https://pypi.python.org/pypi/tredis
        
        .. |CodeClimate| image:: https://codeclimate.com/github/gmr/tredis/badges/gpa.svg
           :target: https://codeclimate.com/github/gmr/tredis
           :alt: Code Climate
        
        .. |QuantifiedCode| image:: https://www.quantifiedcode.com/api/v1/project/cbf1bf1b78cd441ba6078cfada0a8a9a/badge.svg
           :target: https://www.quantifiedcode.com/app/project/cbf1bf1b78cd441ba6078cfada0a8a9a
           :alt: Code issues
        
        
Platform: UNKNOWN
Classifier: Development Status :: 3 - Alpha
Classifier: Intended Audience :: Developers
Classifier: License :: OSI Approved :: BSD License
Classifier: Operating System :: OS Independent
Classifier: Programming Language :: Python :: 2
Classifier: Programming Language :: Python :: 2.7
Classifier: Programming Language :: Python :: 3
Classifier: Programming Language :: Python :: 3.3
Classifier: Programming Language :: Python :: 3.4
Classifier: Programming Language :: Python :: 3.5
Classifier: Programming Language :: Python :: Implementation :: CPythonTopic :: Communications
Classifier: Topic :: Internet
Classifier: Topic :: Software Development :: Libraries
