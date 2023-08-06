Pysubman
========

消息队列，基于 beanstalk

You can install pysubman from PyPI with

.. sourcecode:: bash

    $ pip install pysubman


Version update
--------------


- 1.10.4 添加 Producer put 返回值
- 1.10.4 添加 beanstalkd;修改 Customer Producer 接口
- 1.10.2 去掉 logging
- 1.10.0 将 kafka 迁移到 beanstalk


Getting Started
---------------

Producer
--------

.. sourcecode:: python

    #!/usr/bin/env python
    # coding=utf-8

    import time
    import logging
    logging.basicConfig(level=logging.DEBUG)
    import pysubman


    class EMAIL(object):
        Tube = "t-101"
        Topic = "EMAIL"
        Info = [
            ("TemplateUrl", "%s"),
            ("Params", "%s"),
        ]

    client = pysubman.Producer(address="192.168.0.23:11300")

    while True:
        now_time = time.time()
        client.put(EMAIL, "baidu.com", "chaungwang: {}".format(now_time))
        time.sleep(10)


Customer
--------

.. sourcecode:: python

    #!/usr/bin/env python
    # coding=utf-8

    import logging
    import pysubman
    logging.basicConfig(level=logging.DEBUG)

    service = pysubman.Service()


    @service.C(["EMAIL", "EMAIL.SEND_TEMPLATE"])
    def handler_email_job(body):
        logging.warn(("body", body))


    def main():
        consumer = pysubman.Consumer(address="192.168.0.23:11300").tube("t-101")
        consumer.run(services)


    if __name__ == "__main__":
        main()


Support
-------

If you need help using pysubman or have found a bug, please open a `github issue`_.

.. _github issue: https://github.com/nashuiliang/pysubman/issues
