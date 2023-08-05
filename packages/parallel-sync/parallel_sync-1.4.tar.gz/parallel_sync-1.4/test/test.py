import unittest
import os, sys
import shutil
from bunch import Bunch

BASE_DIR = os.path.dirname(os.path.realpath(__file__))
sys.path.append(os.path.realpath('%s/..' % BASE_DIR))
from parallel_sync import url as _url
from parallel_sync import hasher
from parallel_sync import rsync
from parallel_sync import executor
import yaml
TEST_DATA = yaml.load(open(os.path.join(BASE_DIR, "data.yaml"), 'r'))
TEST_DATA = Bunch(TEST_DATA)
LOCAL_TARGET = '/tmp/images'
REMOTE_TARGET = '/tmp/test_dir/y'

class TestFeatures(unittest.TestCase):
    @classmethod
    def setUpClass(self):
        urls = open(os.path.join(BASE_DIR, 'urls.txt')).readlines()
        self.urls = [url.strip() for url in urls if len(url.strip()) > 0]


    def test_upload_with_key(self):
        executor.delete_dir(REMOTE_TARGET, TEST_DATA.creds)
        _url.download(LOCAL_TARGET, self.urls)
        rsync.upload(LOCAL_TARGET, REMOTE_TARGET, creds=TEST_DATA.creds)
        act_hash = hasher.get_md5(REMOTE_TARGET, TEST_DATA.creds)
        assert act_hash==TEST_DATA.download_md5,\
           'upload failed. Expected: {}, Actual: {}'\
           .format(TEST_DATA.download_md5, act_hash)


    def test_download_with_key(self):
        executor.delete_dir(REMOTE_TARGET, TEST_DATA.creds)
        _url.download(REMOTE_TARGET, self.urls, creds=TEST_DATA.creds)
        rsync.download(REMOTE_TARGET, LOCAL_TARGET, creds=TEST_DATA.creds)
        act_hash = hasher.get_md5(REMOTE_TARGET, TEST_DATA.creds)
        assert act_hash==TEST_DATA.download_md5,\
           'upload failed. Expected: {}, Actual: {}'\
           .format(TEST_DATA.download_md5, act_hash)


    def test_local_download_urls(self):
        executor.delete_dir(REMOTE_TARGET, TEST_DATA.creds)
        _url.download(LOCAL_TARGET, self.urls)
        act_hash = hasher.get_md5(LOCAL_TARGET)
        assert act_hash==TEST_DATA.download_md5,\
           'local download failed. Expected: {}, Actual: {}'\
           .format(TEST_DATA.download_md5, act_hash)


    def test_make_dir_local(self):
        TEST_DIR = '/tmp/some_dir_123/1234'
        if executor.path_exists(TEST_DIR):
            executor.delete_dir(TEST_DIR)
        executor.make_dirs(TEST_DIR)
        assert os.path.exists(TEST_DIR),\
            'Failed tp create directory {}'.format(TEST_DIR)
        shutil.rmtree('/tmp/some_dir_123')


    def test_remote_download_urls(self):
        executor.delete_dir(REMOTE_TARGET, TEST_DATA.creds)
        _url.download(REMOTE_TARGET, self.urls, creds=TEST_DATA.creds)
        act_hash = hasher.get_md5(REMOTE_TARGET, TEST_DATA.creds)
        assert act_hash==TEST_DATA.download_md5,\
           'remote download failed. Expected: {}, Actual: {}'\
           .format(TEST_DATA.download_md5, act_hash)


    def test_remote_download_urls_extract(self):
        executor.delete_dir(REMOTE_TARGET, TEST_DATA.creds)
        _url.download(REMOTE_TARGET, self.urls,\
                      creds=TEST_DATA.creds, extract=True)
        act_hash = hasher.get_md5(REMOTE_TARGET, TEST_DATA.creds)
        assert act_hash==TEST_DATA.download_md5_extracted,\
           'remote download failed. Expected: {}, Actual: {}'\
           .format(TEST_DATA.download_md5, act_hash)



    def test_run(self):
        path = '/tmp'
        output = executor.run('pwd', creds=TEST_DATA.creds, curr_dir=path).strip()
        assert output == path,\
            "run command returned: {} but expected {}.".format(output, path)


if __name__ == '__main__':
    unittest.main()
