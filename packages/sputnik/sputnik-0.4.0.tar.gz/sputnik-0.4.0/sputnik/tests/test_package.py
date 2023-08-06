import os

import pytest

from .. import Sputnik
from ..package import PackageRecipe, Package
from ..archive import Archive
from ..pool import Pool


def test_build_and_check_archive(tmp_path, sample_package_path):
    s = Sputnik('test', '1.0.0')
    recipe = PackageRecipe(sample_package_path, s=s)
    archive1 = recipe.build(tmp_path)

    assert os.path.isfile(archive1.path)

    archive2 = Archive(archive1.path, s=s)

    for key in Archive.keys:
        assert getattr(archive1, key) == getattr(archive2, key)


def test_archive_is_compatible(tmp_path, sample_package_path):
    s = Sputnik('test', '1.0.0')
    recipe = PackageRecipe(sample_package_path, s=s)
    archive = recipe.build(tmp_path)
    assert archive.is_compatible()

    s = Sputnik('test', '2.0.0')
    recipe = PackageRecipe(sample_package_path, s=s)
    archive = recipe.build(tmp_path)
    assert not archive.is_compatible()

    s = Sputnik('xxx', '1.0.0')
    recipe = PackageRecipe(sample_package_path, s=s)
    archive = recipe.build(tmp_path)
    assert not archive.is_compatible()


def test_file_path(tmp_path, tmp_path2, sample_package_path):
    s = Sputnik('test', '1.0.0')
    recipe = PackageRecipe(sample_package_path, s=s)
    archive = Archive(recipe.build(tmp_path).path, s=s)
    pool = Pool(tmp_path2, s=s)
    package = Package(path=archive.install(pool), s=s)

    assert package.has_file('data/model1')
    assert package.file_path('data/model1') == os.path.join(package.path, 'data/model1')
    assert package.dir_path('data') == os.path.join(package.path, 'data')

    assert not package.has_file('data')
    assert not package.has_file('data/model')
    with pytest.raises(Exception):
        assert package.file_path('data/model')


def test_file_path_same_build_directory(tmp_path, tmp_path2, sample_package_path):
    s = Sputnik('test', '1.0.0')
    recipe = PackageRecipe(sample_package_path, s=s)
    archive = Archive(recipe.build(sample_package_path).path, s=s)
    pool = Pool(tmp_path2, s=s)
    package = Package(path=archive.install(pool), s=s)

    assert package.has_file('data/model1')
    assert package.file_path('data/model1') == os.path.join(package.path, 'data/model1')
    assert package.dir_path('data') == os.path.join(package.path, 'data')

    assert not package.has_file('data')
    assert not package.has_file('data/model')
    with pytest.raises(Exception):
        assert package.file_path('data/model')
