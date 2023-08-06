ceph-workbench
==============

`ceph-workbench
<http://ceph-workbench.dachary.org/root/ceph-workbench>`_ is a
:ref:`GPLv3+ Licensed <gplv3>` command line toolbox `Ceph <http://ceph.com>`_.

Installation
------------

* Install Docker http://docs.docker.com/engine/installation/

* Copy the following shell function to :code:~/.bashrc
::
    function ceph-workbench() {
       mkdir -p $HOME/.ceph-workbench
       docker run --rm \
           --volume=$HOME/.ceph-workbench:/home/ubuntu/.ceph-workbench \
           --env USER_ID=$(id -u) \
           dachary/ceph-workbench \
           ceph-workbench "$@"
    }

* Verify that it works
::
    ceph-workbench --help

* Optionally copy your OpenStack :code:openrc.sh file in
  ~/.ceph-workbench/openrc.sh: the ``ceph-qa-suite`` subcommand will
  use it
    
User Guide
----------

The document `Contributing to Ceph: A Guide for Developers
<http://docs.ceph.com/docs/master/dev/>`_ explains the context in
which ``ceph-workbench`` can be used.

Contributor Guide
-----------------

If you want to contribute to ``ceph-workbench``, this part of the documentation is for
you.

.. toctree::
   :maxdepth: 1

   dev/philosophy
   dev/authors
