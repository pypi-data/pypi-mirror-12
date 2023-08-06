#!/usr/bin/env python
# encoding: utf-8
import hashlib
import datetime
import os
import peewee as p
from multiprocessing import RLock
from playhouse.kv import JSONField
from pypi_server.timeit import timeit
from pypi_server.hash_version import HashVersion
from pypi_server.db import Model, DB
from pypi_server.db.users import Users


try:
    import cPickle as pickle
except ImportError:
    import pickle


class File(object):
    __slots__ = ('__close_callbacks', '__file')

    def __init__(self, name, mode='rb'):
        self.__close_callbacks = set()
        self.__file = open(name, mode)

    def add_close_callback(self, cb):
        self.__close_callbacks.add(cb)

    def close(self):
        self.__file.close()

        for cb in list(self.__close_callbacks):
            try:
                cb(self.__file)
            except:
                pass

    def __enter__(self):
        return self.__file

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.close()


class VersionField(p.CharField):
    def __init__(self, *args, **kwargs):
        kwargs['max_length'] = kwargs.pop('max_length', 25)
        super(VersionField, self).__init__(*args, **kwargs)

    def python_value(self, value):
        return HashVersion(value) if value else None

    def db_value(self, value):
        return super(VersionField, self).db_value(str(value))


class FileField(p.CharField):
    STORAGE = None

    def python_value(self, value):
        abs_path = os.path.join(self.STORAGE, value)
        return os.path.join(abs_path)

    def db_value(self, value):
        return super(FileField, self).db_value(
            str(os.path.relpath(value, self.STORAGE))
        )


class Package(Model):
    name = p.CharField(index=True)
    lower_name = p.CharField(index=True, unique=True)
    owner = p.ForeignKeyField(Users, null=True, index=True)
    stable_version = VersionField(null=True)
    is_proxy = p.BooleanField(default=False, null=False)

    @timeit
    def files(self):
        return sorted(
            PackageFile.select(
                Package,
                PackageVersion,
                PackageFile
            ).join(
                PackageVersion
            ).join(
                Package
            ).where(
                Package.id == self.id,
                PackageVersion.hidden == False,
            ).order_by(
                Package.name.asc(),
            ),
            key=lambda x: x.version.version,
            reverse=True,
        )

    @timeit
    def versions(self, show_hidden=False):
        return sorted(
            PackageVersion.select(
                Package,
                PackageVersion
            ).join(
                Package
            ).where(
                PackageVersion.package == self,
                PackageVersion.hidden == show_hidden
            ),
            key=lambda x: x.version,
            reverse=True
        )

    @timeit
    def find_version(self, name):
        return PackageVersion.get(
            PackageVersion.package == self,
            PackageVersion.version == HashVersion(name),
        )

    @timeit
    def create_version(self, name):
        with DB.transaction():
            q = PackageVersion.select(
                PackageVersion.id
            ).where(
                PackageVersion.package == self,
                PackageVersion.version == name
            ).limit(1)

            if q.count():
                return PackageVersion.get(id=q[0].id)

            version = PackageVersion(
                package=self,
                version=name if isinstance(name, HashVersion) else HashVersion(name),
            )

            version.save()

        return version

    @classmethod
    @timeit
    def get_or_create(cls, name, proxy=False):
        if not Package.select().where(Package.name == name).count():
            pkg = Package(name=name, lower_name=name.lower(), is_proxy=proxy, owner=None)
            pkg.save()
            return pkg

        return Package.get(name=name)

    @classmethod
    @timeit
    def find(cls, name):
        q = Package.select().join(
            PackageVersion
        ).join(
            PackageFile
        ).where(
            Package.lower_name == name.lower()
        ).limit(1)

        if q.count():
            return q[0]

        raise LookupError('Package not found')


class PackageVersion(Model):
    package = p.ForeignKeyField(Package, index=True, null=False)
    version = VersionField(index=True, null=False)
    hidden = p.BooleanField(default=False, null=False, index=True)
    downloads = p.IntegerField(default=0, index=True)
    author = p.CharField(max_length=255, null=True)
    author_email = p.CharField(max_length=255, null=True)
    maintainer = p.CharField(max_length=255, null=True)
    maintainer_email = p.CharField(max_length=255, null=True)
    home_page = p.CharField(max_length=256, null=True)
    license = p.CharField(max_length=128, null=True)
    summary = p.CharField(max_length=255, null=True)
    description = p.TextField(null=True)
    keywords = JSONField(default=[])
    platform = p.CharField(max_length=255, null=True)
    download_url = p.CharField(max_length=255, null=True)
    classifiers = JSONField(default=[])
    requires = JSONField(default=[])
    requires_dist = JSONField(default=[])
    provides = JSONField(default=[])
    provides_dist = JSONField(default=[])
    requires_external = JSONField(default=[])
    requires_python = p.CharField(max_length=255, null=True)
    obsoletes = JSONField(default=[])
    obsoletes_dist = JSONField(default=[])
    project_url = p.CharField(max_length=255, null=True)

    @timeit
    def files(self):
        return PackageFile.select().where(
            PackageFile.package == self.package,
            PackageFile.version == self
        )

    @timeit
    def find_file(self, name):
        return PackageFile.select().where(PackageFile.basename == name)

    @timeit
    def create_file(self, name):
        name = os.path.basename(name)
        pkg_file = PackageFile(
            package=self.package,
            version=self,
            basename=name,
            file=os.path.join(
                PackageFile.file.STORAGE,
                self.package.name,
                str(self.version),
                name
            )
        )

        pkg_file.save()
        return pkg_file

    @timeit
    def update_metadata(self, metadata):
        print (metadata)


class PackageFile(Model):
    LOCK = RLock()
    CHUNK_SIZE = 2 ** 16

    file = FileField(index=True, max_length=255)
    basename = p.CharField(max_length=255, index=True)
    ts = p.DateTimeField(null=True)
    md5 = p.CharField(max_length=32, null=True)
    size = p.IntegerField(null=True)
    package = p.ForeignKeyField(Package, index=True)
    version = p.ForeignKeyField(PackageVersion, index=True)

    @classmethod
    def set_storage(cls, path):
        cls.file.STORAGE = path

    @timeit
    def exists(self):
        return os.path.exists(self.file) and not os.path.isdir(self.file)

    @timeit
    def open(self, mode='rb'):
        dirname = os.path.dirname(self.file)

        with self.LOCK:
            if not os.path.exists(dirname):
                os.makedirs(dirname)

        f = File(self.file, mode)

        def metadata_update(f):
            stat = os.stat(self.file)
            self.ts = datetime.datetime.fromtimestamp(stat.st_mtime)
            self.size = stat.st_size

            md5 = hashlib.md5()
            with open(self.file, 'rb') as fl:
                data = fl.read(self.CHUNK_SIZE)
                md5.update(data)
                while data:
                    data = fl.read(self.CHUNK_SIZE)
                    md5.update(data)

                    self.md5 = md5.hexdigest()

            self.save()

        if any(x in mode for x in 'wa'):
            f.add_close_callback(metadata_update)

        return f
