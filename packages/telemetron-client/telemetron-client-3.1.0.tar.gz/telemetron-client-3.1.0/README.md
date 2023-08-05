# README #

A Python client for Telemetron.

## Dependencies

    Python 2.6+
    urllib3
    certifi


## How to use the client

### Sending a counter using _UDP_, to localhost:2013:


    from telemetronclient.telemetronclient import TelemetronClient as Client
    client = Client(
        prefix="foo",
        app="python-client",
        prefix="foo")
    client.inc("mycounter", 1000)
    client.flush()


### Sending a counter using _API_, to _metrics.external.com:443_:


    from telemetronclient.telemetronclient import TelemetronClient as Client
    client = Client(
        host="metrics.external.com",
        port=443,
        transport=Client.TRANSPORT_API,
        api_token="2783c376-6c04-11e5-8941-e78df619a7cd",
        app="python-client",
        prefix="foo")
    client.inc("mycounter", 1000)
    client.flush()


## How to run tests

    pylint --rcfile pylint.rc telemetronclient/
    pep8 telemetronclient/
    nosetests


## Deployment instructions

### Using package:

    python setup.py install


### Using pip:

    pip install telemetron-client
