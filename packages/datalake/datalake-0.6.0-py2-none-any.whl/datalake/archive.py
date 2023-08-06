from os import environ
import urlparse
from memoized_property import memoized_property
import simplejson as json
from datalake_common import Metadata
from datalake import File

from boto.s3.connection import S3Connection
from boto.s3.key import Key
from boto.s3.connection import NoHostProvided


class UnsupportedStorageError(Exception):
    pass


class Archive(object):

    def __init__(self, storage_url=None):
        self.storage_url = storage_url or environ.get('DATALAKE_STORAGE_URL')
        self._validate_storage_url()

    def _validate_storage_url(self):
        if not self.storage_url:
            raise UnsupportedStorageError('Please specify a storage URL')

        if not self._parsed_storage_url.scheme == 's3':
            msg = 'Unsupported storage scheme ' + \
                self._parsed_storage_url.scheme
            raise UnsupportedStorageError(msg)

    @property
    def _parsed_storage_url(self):
        return urlparse.urlparse(self.storage_url)

    def push(self, path, **metadata):
        '''push a file f to the archive with the specified metadata

        returns the url to which the file was pushed.
        '''
        f = self._prepare_file(path, metadata)
        self._upload_file(f)
        return self._get_s3_url(f)

    def _prepare_file(self, path, metadata):
        f = File(path)
        metadata['hash'] = f.hash
        m = Metadata(metadata)
        f.metadata = m
        return f

    def _upload_file(self, f):
        key = self._s3_key_from_metadata(f)
        key.set_metadata('datalake', json.dumps(f.metadata))
        key.set_contents_from_string(f.read())

    _URL_FORMAT = 's3://{bucket}/{key}'

    def _get_s3_url(self, f):
        key = self._s3_key_from_metadata(f)
        return self._URL_FORMAT.format(bucket=self._s3_bucket_name,
                                       key=key.name)

    @property
    def _s3_bucket_name(self):
        return self._parsed_storage_url.netloc

    @memoized_property
    def _s3_bucket(self):
        # Note: we pass validate=False because we may just have push
        # permissions. If validate is not False, boto tries to list the
        # bucket. And this will 403.
        return self._s3_conn.get_bucket(self._s3_bucket_name, validate=False)

    _KEY_FORMAT = '{prefix}-{where}/{what}/{start}/{id}-{name}'

    def _s3_key_from_metadata(self, f):
        # For performance reasons, s3 keys should start with a short random
        # sequence:
        # https://aws.amazon.com/blogs/aws/amazon-s3-performance-tips-tricks-seattle-hiring-event/
        # http://docs.aws.amazon.com/AmazonS3/latest/dev/request-rate-perf-considerations.html
        name = f._basename
        key_name = self._KEY_FORMAT.format(name=name,
                                           prefix=f.hash[0],
                                           **f.metadata)
        return Key(self._s3_bucket, name=key_name)

    @property
    def _s3_host(self):
        r = environ.get('AWS_REGION')
        if r is not None:
            return 's3-' + r + '.amazonaws.com'
        else:
            return NoHostProvided

    @property
    def _s3_conn(self):
        if not hasattr(self, '_conn'):
            k = environ.get('AWS_ACCESS_KEY_ID')
            s = environ.get('AWS_SECRET_ACCESS_KEY')
            self._conn = S3Connection(aws_access_key_id=k,
                                      aws_secret_access_key=s,
                                      host=self._s3_host)
        return self._conn
