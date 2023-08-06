#!/usr/bin/env python

import asyncio
import aioamqp

@asyncio.coroutine
def callback(channel, body, envelope, properties):
    yield from asyncio.sleep(1)
    print(body)

@asyncio.coroutine
def receive():
    try:
        transport, protocol = yield from aioamqp.connect('localhost', 5672)
    except aioamqp.AmqpClosedConnection:
        print("closed connections")
        return

    channel = yield from protocol.channel()
    queue_name = 'py2.queue'

    yield from asyncio.wait_for(channel.queue(queue_name, durable=False, auto_delete=True), timeout=10)

    yield from asyncio.wait_for(channel.basic_consume(callback, queue_name=queue_name), timeout=10)


asyncio.get_event_loop().run_until_complete(receive())
asyncio.get_event_loop().run_forever()
