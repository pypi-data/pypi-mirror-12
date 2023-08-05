#! /usr/bin/env python
# -*-python-*-

from distutils.core import setup

setup(
    name="maildirproc-python2",
    version="0.5.0",
    author="Joel Rosdahl",
    author_email="joel@rosdahl.net",
    license="GNU GPL 2.0",
    scripts=["maildirproc"],
    platforms="platform-independent",
    url="http://joel.rosdahl.net/maildirproc/",
    download_url=("http://joel.rosdahl.net/maildirproc/releases/"
                  "maildirproc-python2-0.5.0.tar.gz"),
    description="maildir processor using Python 2.x as its configuration language",
    long_description="""maildirproc is a program that processes one or
    several existing mail boxes in the maildir format. It is primarily
    focused on mail sorting -- i.e., moving, copying, forwarding and
    deleting mail according to a set of rules. It can be seen as an
    alternative to procmail, but instead of being a delivery agent
    (which wants to be part of the delivery chain), maildirproc only
    processes already delivered mail. And that's a feature, not a
    bug.""",
    classifiers=[
    "Development Status :: 5 - Production/Stable",
    "Environment :: Console",
    "Environment :: No Input/Output (Daemon)",
    "Intended Audience :: End Users/Desktop",
    "License :: OSI Approved :: GNU General Public License (GPL)",
    "Operating System :: Unix",
    "Programming Language :: Python",

    "Programming Language :: Python :: 2",
    "Programming Language :: Python :: 2.6",
    "Programming Language :: Python :: 2.7",
    "Topic :: Communications :: Email",
    "Topic :: Communications :: Email :: Filters",
    ],
    )
