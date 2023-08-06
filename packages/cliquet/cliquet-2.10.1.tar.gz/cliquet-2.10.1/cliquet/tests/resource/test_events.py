from contextlib import contextmanager
import uuid

import webtest
from pyramid.config import Configurator

from cliquet.events import ResourceChanged, ACTIONS
from cliquet.tests.testapp import main as testapp
from cliquet.tests.support import unittest, BaseWebTest, get_request_class


@contextmanager
def notif_broken(app):
    old = app.registry.notify

    def buggy(event):
        if not isinstance(event, ResourceChanged):
            return old(event)
        raise Exception("boom")

    app.registry.notify = buggy
    yield
    app.registry.notify = old


class EventsTest(BaseWebTest, unittest.TestCase):
    def setUp(self):
        super(EventsTest, self).setUp()
        self.events = []
        self.config.add_subscriber(self.listener, ResourceChanged)
        self.config.commit()
        self.body = {'data': {'name': 'de Paris'}}

    def tearDown(self):
        self.events = []
        super(EventsTest, self).tearDown()

    def listener(self, event):
        self.events.append(event)

    def get_test_app(self, settings=None):
        settings = self.get_app_settings(settings)
        self.config = Configurator(settings=settings)
        app = testapp(config=self.config)
        app = webtest.TestApp(app)
        app.RequestClass = get_request_class(self.api_prefix)
        return app

    def test_event_triggered_on_post(self):
        self.app.post_json(self.collection_url, self.body,
                           headers=self.headers, status=201)
        self.assertEqual(len(self.events), 1)
        self.assertEqual(self.events[0].payload['action'], ACTIONS.CREATE)

    def test_event_triggered_on_put(self):
        body = dict(self.body)
        body['data']['id'] = record_id = str(uuid.uuid4())
        record_url = self.get_item_url(record_id)
        self.app.put_json(record_url, body,
                          headers=self.headers, status=201)
        self.assertEqual(len(self.events), 1)
        self.assertEqual(self.events[0].payload['action'], ACTIONS.CREATE)

    def test_event_no_triggered_on_failed_write(self):
        resp = self.app.post_json(self.collection_url, self.body,
                                  headers=self.headers, status=201)
        record = resp.json['data']
        body = dict(self.body)
        body['data']['id'] = record['id']

        # a second post with the same record id
        self.app.post_json(self.collection_url, body, headers=self.headers,
                           status=200)
        self.assertEqual(len(self.events), 1)
        self.assertEqual(self.events[0].payload['action'], ACTIONS.CREATE)

    def test_event_triggered_on_update_via_patch(self):
        resp = self.app.post_json(self.collection_url, self.body,
                                  headers=self.headers, status=201)
        record = resp.json['data']
        record_url = self.get_item_url(record['id'])

        self.app.patch_json(record_url, self.body, headers=self.headers,
                            status=200)
        self.assertEqual(len(self.events), 2)
        self.assertEqual(self.events[0].payload['action'], ACTIONS.CREATE)
        self.assertEqual(self.events[1].payload['action'], ACTIONS.UPDATE)

    def test_event_triggered_on_update_via_put(self):
        body = dict(self.body)
        body['data']['id'] = record_id = str(uuid.uuid4())
        record_url = self.get_item_url(record_id)
        self.app.put_json(record_url, body,
                          headers=self.headers, status=201)

        body['data']['more'] = 'stuff'
        self.app.put_json(record_url, body,
                          headers=self.headers, status=200)

        self.assertEqual(len(self.events), 2)
        self.assertEqual(self.events[0].payload['action'], ACTIONS.CREATE)
        self.assertEqual(self.events[1].payload['action'], ACTIONS.UPDATE)

    def test_event_triggered_on_delete(self):
        resp = self.app.post_json(self.collection_url, self.body,
                                  headers=self.headers, status=201)
        record = resp.json['data']
        record_url = self.get_item_url(record['id'])

        self.app.delete(record_url, headers=self.headers, status=200)
        self.assertEqual(len(self.events), 2)
        self.assertEqual(self.events[0].payload['action'], ACTIONS.CREATE)
        self.assertEqual(self.events[1].payload['action'], ACTIONS.DELETE)

    def test_event_not_triggered(self):
        # if the notification system is broken we should still see
        # the record created
        with notif_broken(self.app.app):
            resp = self.app.post_json(self.collection_url, self.body,
                                      headers=self.headers, status=201)

        record = resp.json['data']
        record_url = self.get_item_url(record['id'])
        self.assertNotEqual(record_url, None)
        self.assertEqual(len(self.events), 0)
