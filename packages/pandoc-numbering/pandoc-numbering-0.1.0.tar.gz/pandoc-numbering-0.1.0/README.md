# pandoc-numbering

*pandoc-numbering* is a [pandoc] filter for numbering all kinds of things.

Demonstration: Using [`pandoc-numbering-sample.md`] as input gives output files in [pdf], [tex], [html], [epub], [md] and other formats.

~~~
$ cat pandoc-numbering-sample.md 
% Sample use of automatic numbering
% Ch. Demko <chdemko@gmail.com>
% 04/11/2015

This is the first section
=========================

Exercise #

This is the first exercise. Have also a look at the [](#second).

> Theorem (Needed for the [second exercise](#second)) #theorem1
> 
> This is a the first theorem. Look at the [exercise](#second "Go to the exercise #").

Exercise (This is the second exercise) #second

Use [theorem #](#theorem1)

This is the second section
=========================

> Theorem #
> 
> Another theorem.

$ pandoc --filter pandoc-numbering pandoc-numbering-sample.md -t markdown
This is the first section
=========================

**Exercise 1**

This is the first exercise. Have also a look at the [Exercise
2](#second).

> <span id="theorem1">**Theorem 1*** (Needed for the [second
> exercise](#second))*</span>
>
> This is a the first theorem. Look at the
> [exercise](#second "Go to the exercise 2").

<span id="second">**Exercise 2*** (This is the second exercise)*</span>

Use [theorem 1](#theorem1)

This is the second section
==========================

> **Theorem 2**
>
> Another theorem.
~~~

This version of pandoc-numbering was tested using pandoc 1.15.1 and is known to work under linux, Mac OS X and Windows.

[pandoc]: http://pandoc.org/
[`pandoc-numbering-sample.md`]: https://raw.githubusercontent.com/chdemko/pandoc-numbering/master/pandoc-numbering-sample.md

Usage
-----

To apply the filter, use the following option with pandoc:

    --filter pandoc-numbering

Installation
------------

pandoc-numbering requires [python], a programming language that comes pre-installed on linux and Mac OS X, and which is easily installed [on Windows].  Either python 2.7 or 3.x will do.

Install pandoc-numbering as root using the bash command

    pip install pandoc-numbering 

To upgrade to the most recent release, use

    pip install --upgrade pandoc-numbering 

Pip is a script that downloads and installs modules from the Python Package Index, [PyPI].  It should come installed with your python distribution.  If you are running linux, pip may be bundled separately.  On a Debian-based system (including Ubuntu), you can install it as root using

    apt-get update
    apt-get install python-pip

[python]: https://www.python.org/
[on Windows]: https://www.python.org/downloads/windows/
[PyPI]: https://pypi.python.org/pypi


Getting Help
------------

If you have any difficulties with pandoc-numbering, please feel welcome to [file an issue] on github so that we can help.

[file an issue]: https://github.com/chdemko/pandoc-numbering/issues
