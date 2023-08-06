===============================
hyper-h2: HTTP/2 Protocol Stack
===============================

.. image:: https://raw.github.com/Lukasa/hyper/development/docs/source/images/hyper.png

.. image:: https://travis-ci.org/python-hyper/hyper-h2.png?branch=master
    :target: https://travis-ci.org/python-hyper/hyper-h2

This repository contains a pure-Python implementation of a HTTP/2 protocol
stack. It's written from the ground up to be embeddable in whatever program you
choose to use, ensuring that you can speak HTTP/2 regardless of your
programming paradigm.

You use it like this::

    import h2.connection

    conn = h2.connection.H2Connection()
    conn.send_headers(stream_id=stream_id, headers=headers)
    conn.send_data(stream_id, data)
    socket.sendall(conn.data_to_send())
    events = conn.receive_data(socket_data)

This repository does not provide a parsing layer, a network layer, or any rules
about concurrency. Instead, it's a purely in-memory solution, defined in terms
of data actions and HTTP/2 frames. This is one building block of a full Python
HTTP implementation.

To install it, just run::

    pip install h2

Documentation
=============

Documentation is available at http://python-hyper.org/h2/.

Contributing
============

``hyper-h2`` welcomes contributions from anyone! Unlike many other projects we
are happy to accept cosmetic contributions and small contributions, in addition
to large feature requests and changes.

Before you contribute (either by opening an issue or filing a pull request),
please `read the contribution guidelines`_.

.. _read the contribution guidelines: http://hyper.readthedocs.org/en/development/contributing.html

License
=======

``hyper-h2`` is made available under the MIT License. For more details, see the
``LICENSE`` file in the repository.

Authors
=======

``hyper-h2`` is maintained by Cory Benfield, with contributions from others. For
more details about the contributors, please see ``CONTRIBUTORS.rst``.


Release History
===============

1.1.1 (2015-11-17)
------------------

Bugfixes
~~~~~~~~

- Forcibly lowercase all header names to improve compatibility with
  implementations that demand lower-case header names.

1.1.0 (2015-10-28)
------------------

API Changes (Backward-Compatible)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- Added a new ``ConnectionTerminated`` event, which fires when GOAWAY frames
  are received.
- Added a subclass of ``NoSuchStreamError``, called ``StreamClosedError``, that
  fires when actions are taken on a stream that is closed and has had its state
  flushed from the system.
- Added ``StreamIDTooLowError``, raised when the user or the remote peer
  attempts to create a stream with an ID lower than one previously used in the
  dialog. Inherits from ``ValueError`` for backward-compatibility reasons.

Bugfixes
~~~~~~~~

- Do not throw ``ProtocolError`` when attempting to send multiple GOAWAY
  frames on one connection.
- We no longer forcefully change the decoder table size when settings changes
  are ACKed, instead waiting for remote acknowledgement of the change.
- Improve the performance of checking whether a stream is open.
- We now attempt to lazily garbage collect closed streams, to avoid having the
  state hang around indefinitely, leaking memory.
- Avoid further per-stream allocations, leading to substantial performance
  improvements when many short-lived streams are used.

1.0.0 (2015-10-15)
------------------

- First production release!


