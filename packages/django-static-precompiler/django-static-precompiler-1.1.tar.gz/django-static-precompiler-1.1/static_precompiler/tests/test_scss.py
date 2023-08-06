# coding: utf-8
import os

import pretend
import pytest

from static_precompiler import compilers, exceptions, utils


def test_compile_file(monkeypatch, tmpdir):
    monkeypatch.setattr("static_precompiler.settings.ROOT", tmpdir.strpath)
    convert_urls = pretend.call_recorder(lambda *args: None)
    monkeypatch.setattr("static_precompiler.utils.convert_urls", convert_urls)

    compiler = compilers.SCSS()

    assert compiler.compile_file("styles/test.scss") == "COMPILED/styles/test.css"

    full_output_path = compiler.get_full_output_path("styles/test.scss")
    assert convert_urls.calls == [pretend.call(full_output_path, "styles/test.scss")]

    assert os.path.exists(full_output_path)

    with open(full_output_path) as compiled:
        assert compiled.read() == """p {
  font-size: 15px; }
  p a {
    color: red; }
"""


def test_sourcemap(monkeypatch, tmpdir):

    monkeypatch.setattr("static_precompiler.settings.ROOT", tmpdir.strpath)
    monkeypatch.setattr("static_precompiler.utils.convert_urls", lambda *args: None)

    compiler = compilers.SCSS(sourcemap_enabled=False)
    compiler.compile_file("styles/test.scss")
    full_output_path = compiler.get_full_output_path("styles/test.scss")
    assert not os.path.exists(full_output_path + ".map")

    compiler = compilers.SCSS(sourcemap_enabled=True)
    compiler.compile_file("styles/test.scss")
    full_output_path = compiler.get_full_output_path("styles/test.scss")
    assert os.path.exists(full_output_path + ".map")


def test_compile_source():
    compiler = compilers.SCSS(executable="scss")
    assert (
        utils.fix_line_breaks(compiler.compile_source("p {font-size: 15px; a {color: red;}}")) ==
        "p {\n  font-size: 15px; }\n  p a {\n    color: red; }\n"
    )

    compiler = compilers.SCSS(executable="sass")
    assert (
        utils.fix_line_breaks(compiler.compile_source("p {font-size: 15px; a {color: red;}}")) ==
        "p {\n  font-size: 15px; }\n  p a {\n    color: red; }\n"
    )

    with pytest.raises(exceptions.StaticCompilationError):
        compiler.compile_source('invalid syntax')

    with pytest.raises(exceptions.StaticCompilationError):
        compiler.compile_source('invalid syntax')

    # Test non-ascii
    NON_ASCII = """@charset "UTF-8";
.external_link:first-child:before {
  content: "Zobacz także:";
  background: url(картинка.png); }
"""
    assert utils.fix_line_breaks(compiler.compile_source(NON_ASCII)) == NON_ASCII

    compiler = compilers.SASS(executable="sass")
    assert (
        utils.fix_line_breaks(compiler.compile_source("p\n  font-size: 15px\n  a\n    color: red")) ==
        "p {\n  font-size: 15px; }\n  p a {\n    color: red; }\n"
    )
    compiler = compilers.SASS(executable="scss")
    assert (
        utils.fix_line_breaks(compiler.compile_source("p\n  font-size: 15px\n  a\n    color: red")) ==
        "p {\n  font-size: 15px; }\n  p a {\n    color: red; }\n"
    )


def test_parse_import_string():
    compiler = compilers.SCSS()
    import_string = """"foo, bar" , "foo", url(bar,baz),
     'bar,foo',bar screen, projection"""
    assert compiler.parse_import_string(import_string) == [
        "bar",
        "bar,foo",
        "foo",
        "foo, bar",
    ]

    import_string = """"foo,bar", url(bar,baz), 'bar,foo',bar screen, projection"""
    assert compiler.parse_import_string(import_string) == [
        "bar",
        "bar,foo",
        "foo,bar",
    ]

    import_string = """"foo" screen"""
    assert compiler.parse_import_string(import_string) == ["foo"]


def test_find_imports():
    source = """
@import "foo.css", ;
@import " ";
@import "foo.scss";
@import "foo";
@import "foo.css";
@import "foo" screen;
@import "http://foo.com/bar";
@import url(foo);
@import "rounded-corners",
        "text-shadow";
@import "compass";
@import "compass.scss";
@import "compass/css3";
@import url(http://fonts.googleapis.com/css?family=Arvo:400,700,400italic,700italic);
@import url("http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,400,700,600,300");
@import "foo,bar", url(bar,baz), 'bar,foo';
"""

    expected = [
        "bar,foo",
        "compass",
        "compass.scss",
        "compass/css3",
        "foo",
        "foo,bar",
        "foo.scss",
        "rounded-corners",
        "text-shadow",
    ]
    compiler = compilers.SCSS(compass_enabled=False)
    assert compiler.find_imports(source) == expected

    compiler = compilers.SCSS(compass_enabled=True)
    expected = [
        "bar,foo",
        "foo",
        "foo,bar",
        "foo.scss",
        "rounded-corners",
        "text-shadow",
    ]
    assert compiler.find_imports(source) == expected


def test_locate_imported_file(monkeypatch):
    compiler = compilers.SCSS()

    root = os.path.dirname(__file__)

    existing_files = set()
    for f in ("A/B.scss", "A/_C.scss", "A/S.sass", "D.scss"):
        existing_files.add(os.path.join(root, "static", utils.normalize_path(f)))

    monkeypatch.setattr("os.path.exists", lambda x: x in existing_files)

    assert compiler.locate_imported_file("A", "B.scss") == "A/B.scss"
    assert compiler.locate_imported_file("A", "C") == "A/_C.scss"
    assert compiler.locate_imported_file("E", "../D") == "D.scss"
    assert compiler.locate_imported_file("E", "../A/B.scss") == "A/B.scss"
    assert compiler.locate_imported_file("", "D.scss") == "D.scss"
    assert compiler.locate_imported_file("A", "S.sass") == "A/S.sass"
    assert compiler.locate_imported_file("A", "S") == "A/S.sass"

    with pytest.raises(exceptions.StaticCompilationError):
        compiler.locate_imported_file("", "Z.scss")


def test_find_dependencies(monkeypatch):
    compiler = compilers.SCSS()
    files = {
        "A.scss": "@import 'B/C.scss';",
        "B/C.scss": "@import '../E';",
        "_E.scss": "p {color: red;}",
        "compass-import.scss": '@import "compass"',
    }
    monkeypatch.setattr(compiler, "get_source", lambda x: files[x])

    root = os.path.dirname(__file__)

    existing_files = set()
    for f in files:
        existing_files.add(os.path.join(root, "static", utils.normalize_path(f)))

    monkeypatch.setattr("os.path.exists", lambda x: x in existing_files)

    assert compiler.find_dependencies("A.scss") == ["B/C.scss", "_E.scss"]
    assert compiler.find_dependencies("B/C.scss") == ["_E.scss"]
    assert compiler.find_dependencies("_E.scss") == []


def test_compass(monkeypatch, tmpdir):
    monkeypatch.setattr("static_precompiler.settings.ROOT", tmpdir.strpath)

    compiler = compilers.SCSS(compass_enabled=True)

    assert compiler.compile_file("test-compass.scss") == "COMPILED/test-compass.css"

    full_output_path = compiler.get_full_output_path("test-compass.scss")
    assert os.path.exists(full_output_path)
    with open(full_output_path) as compiled:
        assert compiled.read() == """p {
  background: url('/static/images/test.png'); }
"""


def test_compass_import(monkeypatch, tmpdir):
    monkeypatch.setattr("static_precompiler.settings.ROOT", tmpdir.strpath)

    compiler = compilers.SCSS(compass_enabled=True)

    assert compiler.compile_file("styles/test-compass-import.scss") == "COMPILED/styles/test-compass-import.css"

    full_output_path = compiler.get_full_output_path("styles/test-compass-import.scss")
    assert os.path.exists(full_output_path)

    with open(full_output_path) as compiled:
        assert compiled.read() == """.round-corners {
  -moz-border-radius: 4px / 4px;
  -webkit-border-radius: 4px 4px;
  border-radius: 4px / 4px; }
"""

    compiler = compilers.SCSS(compass_enabled=False)
    with pytest.raises(exceptions.StaticCompilationError):
        compiler.compile_file("styles/test-compass-import.scss")


def test_get_extra_args():

    assert compilers.SCSS().get_extra_args() == []

    assert compilers.SCSS(compass_enabled=True, load_paths=["foo", "bar"]).get_extra_args() == [
        "-I", "foo",
        "-I", "bar",
        "--compass",
    ]

    with pytest.raises(ValueError):
        compilers.SCSS(load_paths="foo")
