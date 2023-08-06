Pysubman
========

消息队列，基于 redis 或者 beanstalk

You can install pysubman from PyPI with

.. sourcecode:: bash

    $ pip install pysubman


Version update
--------------


- 1.20.1.3 修改 redis rpop to brpop
- 1.20.1.1 添加 redis 消息默认前缀 `mq:`
- 1.20.1.0 添加 redis 消息队列, <C-c> 终止处理
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

    import json
    import time
    from pysubman.redis.client import Client

    client = Client(host="127.0.0.1:6379:5")
    message = json.dumps({
        "type": "linkedin",
        "time": time.time(),
    })
    client.publish("oauth:linkedin", message)



Customer
--------

.. sourcecode:: python

    #!/usr/bin/env python
    # coding=utf-8

    from pysubman.redis.client import Client
    from pysubman.redis.service import Service
    from pysubman.redis.subscribe import Subscriber

    services = Service()


    @services.C("oauth:linkedin")
    def handler_email_job(body):
        logging.warn(("body", body))


    def main():
        Subscriber(Client(host="127.0.0.1:6379:5")).subscribe(services)


    if __name__ == "__main__":
        main()


TODO
----

- 添加 tcp 链接超时处理

Support
-------

If you need help using pysubman or have found a bug, please open a `github issue`_.

.. _github issue: https://github.com/nashuiliang/pysubman/issues
