===============================
Netuitive Python Client
===============================

What is Netuitive monitoring?
-----------------------------
Netuitive provides an adaptive monitoring and analytics platform for cloud infrastructure and web applications.
Netuitive learns behaviors and utilizes pre-set dynamic policies that reduce the manual effort and human-guesswork typically required to monitor systems and applications.
This unique technology enables IT operations and developers to automate performance analysis, detect relevant anomalies, and determine efficient capacity utilization.

Features
--------

* Create a Netuitive Element with the following data:
    * Element Name
    * Attributes
    * Tags
    * Metric Samples

* Create a Netuitive Event with the following data
    * Element Name
    * Event Type
    * Title
    * Message
    * Level
    * Tags
    * Source


Usage
-----

###### Setup the Client

``ApiClient = netuitive.Client(api_key='<my_api_key>')``


###### Setup the Element

``MyElement = netuitive.Element()``

###### Add an Attribute

``MyElement.add_attribute('Language', 'Python')``

###### Add a Tag

``MyElement.add_tag('Production', 'True')``

###### Add a Metric Sample

``MyElement.add_sample('cpu.idle', 1432832135, 1, host='my_hostname')``

###### Add a Metric Sample with a Sparse Data Strategy

``MyElement.add_sample('app.zero', 1432832135, 1, host='my_hostname', sparseDataStrategy='ReplaceWithZero')``

###### Add a Metric Sample with unit type

``MyElement.add_sample('app.requests', 1432832135, 1, host='my_hostname', unit='requests/s')``


###### Send the Samples

``ApiClient.post(MyElement)``

###### Remove the samples already sent

``MyElement.clear_samples()``


###### Create an Event

``MyEvent = netuitive.Event(hst, 'INFO', 'test event','big old test message', 'INFO')``

###### Send the Event

``ApiClient.post_event(MyEvent)``


Example
-------


    import netuitive

    ApiClient = netuitive.Client(api_key='aaaa9956110211e594444697f922ec7b')

    MyElement = netuitive.Element()

    MyElement.add_attribute('Language', 'Python')
    MyElement.add_attribute('app_version', '7.0')

    MyElement.add_tag('Production', 'True')
    MyElement.add_tag('app_tier', 'True')

    MyElement.add_sample('app.error', 1432832135, 1, host='appserver01')
    MyElement.add_sample('app.request', 1432832135, 10, host='appserver01')

    ApiClient.post(MyElement)

    MyElement.clear_samples()

    MyEvent = netuitive.Event('appserver01', 'INFO', 'test event','big old test message', 'INFO')

    ApiClient.post_event(MyEvent)


Copyright and License
---------------------

Copyright 2015 Netuitive, Inc. under [the Apache 2.0 license](LICENSE).
