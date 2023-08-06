import uuid

from tests.functional.utils import FunctionalTestCase
from oiopy.object_storage import ObjectStorageAPI
from oiopy import exceptions
from oiopy import utils


class TestObjectStorageFunctional(FunctionalTestCase):
    def setUp(self):
        super(TestObjectStorageFunctional, self).setUp()

        self.container_name = 'func-test-container-%s' % uuid.uuid4()
        self.container_name_2 = 'func-test-container-%s-2' % uuid.uuid4()
        self.container_name_3 = 'func-test-container-%s-3' % uuid.uuid4()

        self.object_name = "func-test-object-%s" % uuid.uuid4()
        self.object_name_2 = "func-test-object-%s-2" % uuid.uuid4()

        self.test_data = b'1337' * 10
        self.hash_data = "894A14D048263CA40300302C7A5DB67C"
        self.storage = ObjectStorageAPI(self.namespace, self.proxyd_uri)

        self.storage.container_create(self.account, self.container_name)
        self.storage.container_create(self.account, self.container_name_2)
        self.storage.object_create(self.account, self.container_name,
                                   obj_name=self.object_name,
                                   data=self.test_data)

    def tearDown(self):
        super(TestObjectStorageFunctional, self).tearDown()
        for obj in (self.object_name, self.object_name_2):
            try:
                self.storage.object_delete(self.account, self.container_name,
                                           obj)
            except Exception:
                pass

        for container in [self.container_name,
                          self.container_name_2,
                          self.container_name_3]:
            try:
                self.storage.container_delete(self.account, container)
            except Exception:
                pass

    def test_show_container(self):
        info = self.storage.container_show(self.account, self.container_name)
        self.assertTrue(info)

    def test_object_list(self):
        l = self.storage.object_list(self.account, self.container_name)
        self.assertEqual(len(l['objects']), 1)
        obj = l['objects'][0]
        self.assertEqual(obj['name'], self.object_name)
        self.assertEqual(obj['hash'], '894A14D048263CA40300302C7A5DB67C')
        self.assertEqual(obj['size'], 40)
        self.assertEqual(obj['ver'], 0)
        self.assertEqual(obj['deleted'], False)
        self.assertTrue(obj['ctime'])
        self.assertTrue(obj['system_metadata'])
        self.assertTrue(obj['policy'])

    def test_create_container(self):
        self.storage.container_create(self.account,
                                      self.container_name_3)

    def test_delete_container(self):
        self.storage.container_delete(self.account, self.container_name_2)
        self.assertRaises(exceptions.NoSuchContainer,
                          self.storage.container_show, self.account,
                          self.container_name_2)

    def test_container_metadata(self):
        key = "user." + utils.random_string()
        key2 = "user." + utils.random_string()
        value = utils.random_string()

        meta = {key: value}
        self.storage.container_update(self.account, self.container_name, meta)
        rmeta = self.storage.container_show(self.account, self.container_name)
        self.assertEqual(rmeta.get(key), value)
        self.storage.container_update(self.account, self.container_name,
                                      {key2: value},
                                      True)
        rmeta = self.storage.container_show(self.account, self.container_name)
        self.assertEqual(rmeta.get(key), None)
        self.assertEqual(rmeta.get(key2), value)
        self.assertTrue(rmeta.get("sys.m2.usage"))
        self.assertTrue(rmeta.get("sys.m2.ctime"))

    def test_object_metadata(self):
        key = utils.random_string()
        value = utils.random_string()
        meta = {key: value}
        self.storage.object_update(self.account, self.container_name,
                                   self.object_name, meta)
        rmeta = self.storage.object_show(self.account, self.container_name,
                                         self.object_name)
        self.assertEqual(rmeta['properties'].get(key), value)
        key2 = utils.random_string()
        value2 = utils.random_string()
        meta2 = {key2: value2}
        self.storage.object_update(self.account, self.container_name,
                                   self.object_name, meta2, clear=True)
        rmeta = self.storage.object_show(self.account, self.container_name,
                                         self.object_name)
        self.assertEqual(rmeta['properties'].get(key), None)
        self.assertEqual(rmeta['properties'].get(key2), value2)
        self.assertEqual(rmeta.get("name"), self.object_name)
        self.assertEqual(rmeta.get("hash"), self.hash_data)
        self.assertEqual(rmeta.get("length"), "40")
        self.assertTrue(rmeta.get("mime-type"))

    def test_fetch_object(self):
        meta, stream = self.storage.object_fetch(self.account,
                                                 self.container_name,
                                                 self.object_name)
        data = "".join(stream)
        self.assertEqual(data, self.test_data)

    def test_fetch_partial_object(self):
        meta, stream = self.storage.object_fetch(self.account,
                                                 self.container_name,
                                                 self.object_name, size=10,
                                                 offset=4)
        data = "".join(stream)
        self.assertEqual(data, self.test_data[4:10 + 4])

    def test_store_object(self):
        self.storage.object_create(self.account,
                                   self.container_name,
                                   obj_name=self.object_name,
                                   data=self.test_data)
        obj = self.storage.object_show(self.account, self.container_name,
                                       self.object_name)
        self.assertTrue(obj)

    def test_delete_object(self):
        self.storage.object_delete(self.account, self.container_name,
                                   self.object_name)
        self.assertRaises(exceptions.NoSuchObject, self.storage.object_fetch,
                          self.account, self.container_name, self.object_name)

    def test_list_account(self):
        containers, meta = self.storage.container_list(self.account)
        self.assertEqual(len(containers), 2)
        self.assertTrue(meta)
        self.assertEqual(meta['id'], self.account)
        self.assertEqual(meta['containers'], 2)
        self.assertTrue(meta['ctime'])
        self.assertEqual(meta['metadata'], {})

    def test_stat_account(self):
        info = self.storage.account_show(self.account)
        self.assertEqual(info['id'], self.account)
        self.assertEqual(info['containers'], 2)
        self.assertTrue(info['ctime'])
        self.assertEqual(info['metadata'], {})
