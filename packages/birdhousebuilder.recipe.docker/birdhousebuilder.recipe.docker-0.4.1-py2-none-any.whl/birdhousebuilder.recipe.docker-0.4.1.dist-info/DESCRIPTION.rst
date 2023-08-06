******************************
birdhousebuilder.recipe.docker
******************************

.. image:: https://travis-ci.org/bird-house/birdhousebuilder.recipe.docker.svg?branch=master
   :target: https://travis-ci.org/bird-house/birdhousebuilder.recipe.docker
   :alt: Travis Build

.. contents::

Introduction
************

``birdhousebuilder.recipe.docker`` is a `Buildout`_ recipe to generate a `Dockerfile`_ for `Birdhouse`_ applications.

.. _`Buildout`: http://buildout.org/
.. _`Dockerfile`: https://www.docker.com/
.. _`Birdhouse`: http://bird-house.github.io/

Usage
*****

The recipe will generate a Dockerfile for your application. You can find the Dockerfile in the root folder of the application. 

Supported options
=================

This recipe supports the following options:

**image-name**
   The docker base image name. Default is ``ubuntu``.

**image-version**
   The docker base image version. Default is ``latest``.

**maintainer**
   The maintainer of the Dockerfile.

**description**
   Description of the Dockerfile.

**vendor**
   The vendor of the application. Default: Birdhouse

**version**
   The version of the application. Default: 1.0.0

**expose**
   List of exposed ports.

**environment**
   List of KEY=value pairs added as ENV parameters in the Dockerfile.


Example usage
=============

The following example ``buildout.cfg`` generates a Dockerfile for Ubuntu 14.04:

.. code-block:: ini 

  [buildout]
  parts = docker

  [docker]
  recipe = birdhousebuilder.recipe.docker
  image-name = ubuntu
  image-version = 14.04
  maintainer = Birdhouse
  description = My Birdhouse App
  expose = 8090 8094
  environment =
       MY_DATA_DIR=/opt/data
       OUTPUT_PORT=8090





Authors
*******

Carsten Ehbrecht ehbrecht at dkrz.de

Changes
*******

0.4.1 (2015-12-10)
==================

* fixed setting of EXPOSE in Dockerfile.

0.4.0 (2015-12-10)
==================

* added environment and expose options.
* enabled travis.

0.3.2 (2015-09-25)
==================

* fixed malleefowl default port in dockerfile template.
* changed dockerfile volumes.

0.3.1 (2015-09-24)
==================

* updated Dockerfile template.
* added output-port option.

0.3.0 (2015-09-22)
==================

* updated Dockerfile template.
* more options added.

0.2.2 (2015-08-05)
==================

* cleaned up ... removed conda dependency.
* update to buildout 2.x.

0.2.1 (2015-04-13)
==================

* Updated Dockerfile template for CentOS builds (sudo was missing).

0.2.0 (2015-03-16)
==================

* Updated Dockerfile template for birdhouse environments.

0.1.1 (2014-11-13)
==================

* Updated Dockerfile template
starts only supervisord.
* Fixed example in Readme.

0.1.0 (2014-11-05)
==================

* Initial Release.


