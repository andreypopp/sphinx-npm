# sphinx-npm

A launcher for [Sphinx][] documentation generator which provides sane defaults
for configuring npm packages such as:

  * it defaults to run Sphinx without configuration file
  * it defaults to use `singlehtml` builder which builds
  * it takes `author`, `project`, `version` and `release` options from
    corresponding fields in a `package.json`
  * it defaults `master_doc` to `README.rst` file in a root of a packagea

You can override any of these by using corresponding command line options, usage
is as follows:

    sphinx-npm <PACKAGE DIR> <OUTPUT DIR>

[Sphinx]: http://sphinx-doc.org/
