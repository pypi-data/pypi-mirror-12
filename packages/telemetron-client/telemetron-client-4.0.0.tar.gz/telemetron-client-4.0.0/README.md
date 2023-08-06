# README #

A Python client for Telemetron.

## Dependencies

    Python 2.6+
    urllib3
    certifi


## How to use the client

### Sending a counter using _UDP_, to localhost:2013:


    from telemetronclient.telemetronclient import TelemetronClient as Client
    client = Client(settings={
        'app': "myapp",
        'prefix': "foo",
        'transport': Client.TRANSPORT_UDP,
        'host': '127.0.0.1',
        'port': 2013})
    client.counter("mycounter", 1000)
    client.flush()


### Sending a counter using _API_, to _metrics.external.com:443_, with 2 seconds timeout:


    from telemetronclient.telemetronclient import TelemetronClient as Client
    client = Client(settings={
        'host': "metrics.external.com",
        'port': 443,
        'transport': Client.TRANSPORT_API_SSL,
        'token': "2783c376-6c04-11e5-8941-e78df619a7cd",
        'app': "myapp",
        'prefix': "foo",
        'timeout': 2.0})
    client.counter("mycounter", 1000)
    client.flush()


## How to run tests

    pylint --rcfile pylint.rc telemetronclient/
    pylint --rcfile pylint.rc tests/
    pep8 telemetronclient/
    pep8 tests/
    nosetests


## Deployment instructions

### Using package:

    python setup.py install


### Using pip:

    pip install telemetron-client
