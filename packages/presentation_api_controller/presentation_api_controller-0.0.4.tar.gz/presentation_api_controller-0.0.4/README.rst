Presentation API Controller
===========================

Presentation API Controller for MCTS.


Example
-------

Open two terminals.

1st terminal run controller.

.. code-block:: bash

    // Terminal One
    $ python presentation_controller/controller.py
    INFO: Run server on address: 127.0.0.1, port: 43378
	Controller runs on 127.0.0.1 43378

	# 1st phase

	Enter host:


And 2nd terminal run test presentation server.

.. code-block:: bash

    // Terminal Two
    $ python test/pserver.py
    # 1st phase

	[1st] Run server on address: 127.0.0.1, port: 52608


Back to 1st terminal, type pserver's `host` and `port`.

.. code-block:: bash

    // Terminal One
    $ python presentation_controller/controller.py
    INFO: Run server on address: 127.0.0.1, port: 43378
	Controller runs on 127.0.0.1 43378

	# 1st phase

	Enter host: 127.0.0.1
	Enter port: 52608


Then they will talk to each other.
