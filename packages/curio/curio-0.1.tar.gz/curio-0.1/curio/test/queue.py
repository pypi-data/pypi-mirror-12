# queue.py

import unittest
from collections import deque

from ..import *

# ---- Queuing

class TestQueue(unittest.TestCase):
    def test_queue_simple(self):
        kernel = get_kernel()
        results = []
        async def consumer(queue, label):
              while True:
                  item = await queue.get()
                  if item is None:
                      break
                  results.append((label, item))
                  await queue.task_done()
              await queue.task_done()
              results.append(label + ' done')

        async def producer():
            queue = Queue()
            results.append('producer_start')
            await new_task(consumer(queue, 'cons1'))
            await new_task(consumer(queue, 'cons2'))
            await sleep(0.1)
            for n in range(4):
                await queue.put(n)
                await sleep(0.1)
            for n in range(2):
                await queue.put(None)
            results.append('producer_join')
            await queue.join()
            results.append('producer_done')

        kernel.add_task(producer())
        kernel.run()

        self.assertEqual(results, [
                'producer_start',
                ('cons1', 0),
                ('cons2', 1),
                ('cons1', 2),
                ('cons2', 3),
                'cons1 done',
                'cons2 done',
                'producer_join',
                'producer_done',
                ])

    def test_queue_unbounded(self):
        kernel = get_kernel()
        results = []
        async def consumer(queue, label):
              while True:
                  item = await queue.get()
                  if item is None:
                      break
                  results.append((label, item))
                  await queue.task_done()
              await queue.task_done()
              results.append(label + ' done')

        async def producer():
            queue = Queue()
            results.append('producer_start')
            await new_task(consumer(queue, 'cons1'))
            await sleep(0.1)
            for n in range(4):
                await queue.put(n)
            await queue.put(None)
            results.append('producer_join')
            await queue.join()
            results.append('producer_done')

        kernel.add_task(producer())
        kernel.run()

        self.assertEqual(results, [
                'producer_start',
                ('cons1', 0),
                ('cons1', 1),
                ('cons1', 2),
                ('cons1', 3),
                'cons1 done',
                'producer_join',
                'producer_done',
                ])


    def test_queue_bounded(self):
        kernel = get_kernel()
        results = []
        async def consumer(queue, label):
              while True:
                  item = await queue.get()
                  if item is None:
                      break
                  results.append((label, item))
                  await sleep(0.1)
                  await queue.task_done()
              await queue.task_done()
              results.append(label + ' done')

        async def producer():
            queue = Queue(maxsize=2)
            results.append('producer_start')
            await new_task(consumer(queue, 'cons1'))
            await sleep(0.1)
            for n in range(4):
                await queue.put(n)
                results.append(('produced', n))
            await queue.put(None)
            results.append('producer_join')
            await queue.join()
            results.append('producer_done')

        kernel.add_task(producer())
        kernel.run()

        self.assertEqual(results, [
                'producer_start',
                ('cons1', 0),
                ('produced', 0),
                ('produced', 1),
                ('produced', 2),
                ('produced', 3),
                ('cons1', 1),
                'producer_join',
                ('cons1', 2),
                ('cons1', 3),
                'producer_done',
                'cons1 done',
                ])

    def test_queue_get_cancel(self):
        # Make sure a blocking get can be cancelled
        kernel = get_kernel()
        results = []
        async def consumer():
              queue = Queue()
              try:
                  results.append('consumer waiting')
                  item = await queue.get()
                  results.append('not here')
              except CancelledError:
                  results.append('consumer cancelled')

        async def driver():
            task = await new_task(consumer())
            await sleep(0.5)
            await task.cancel()

        kernel.add_task(driver())
        kernel.run()
        self.assertEqual(results, [
                'consumer waiting',
                'consumer cancelled'
                ])

    def test_queue_put_cancel(self):
        # Make sure a blocking put() can be cancelled
        kernel = get_kernel()
        results = []

        async def producer():
            queue = Queue(1)
            results.append('producer_start')
            await queue.put(0)
            try:
                await queue.put(1)
                results.append('not here')
            except CancelledError:
                results.append('producer_cancel')

        async def driver():
            task = await new_task(producer())
            await sleep(0.5)
            await task.cancel()

        kernel.add_task(driver())
        kernel.run()
        self.assertEqual(results, [
                'producer_start',
                'producer_cancel'
                ])


    def test_queue_get_timeout(self):
        # Make sure a blocking get respects timeouts
        kernel = get_kernel()
        results = []
        async def consumer():
              queue = Queue()
              try:
                  results.append('consumer waiting')
                  item = await queue.get(timeout=0.5)
                  results.append('not here')
              except TimeoutError:
                  results.append('consumer timeout')

        kernel.add_task(consumer())
        kernel.run()
        self.assertEqual(results, [
                'consumer waiting',
                'consumer timeout'
                ])

    def test_queue_put_timeout(self):
        # Make sure a blocking put() respects timeouts
        kernel = get_kernel()
        results = []

        async def producer():
            queue = Queue(1)
            results.append('producer start')
            await queue.put(0)
            try:
                await queue.put(1, timeout=0.5)
                results.append('not here')
            except TimeoutError:
                results.append('producer timeout')

        kernel.add_task(producer())
        kernel.run()
        self.assertEqual(results, [
                'producer start',
                'producer timeout'
                ])

    '''
    def test_queue_put_nowait(self):
        q = Queue(1)
        q.put_nowait(1)
        self.assertTrue(q.full())
        self.assertEqual(q.qsize(), 1)
        with self.assertRaises(QueueFull):
            q.put_nowait(2)

    def test_queue_get_nowait(self):
        q = Queue()
        self.assertTrue(q.empty())
        with self.assertRaises(QueueEmpty):
            q.get_nowait()
    '''

if __name__ == '__main__':
    unittest.main()
