sxclient: Python SX client-side library
=======================================

Introduction
------------

sxclient is a library which implements client-side methods for communicating
with an SX Cluster. Using the provided objects and functions, it is possible to
prepare and send a query as per the API documentation at
http://docs.skylable.com/.

Internally, sxclient uses requests library (http://python-requests.org/) and
currently requires Python 2.7.


Usage
-----

In order to run an operation provided by the library, you have to perform some
preparatory actions:

- prepare a Cluster object, containing cluster location data;
- prepare a UserData object, containing user credentials used to authorize
  operations;
- prepare either a ClusterSession object or SXClient object which serves as a 
  context for the connections with the cluster.

Afterwards, you can run a series of operations using the previously created
ClusterSession object as a context.


Initializing Cluster object
^^^^^^^^^^^^^^^^^^^^^^^^^^^

The most basic way of initializing the Cluster object is to pass the cluster
name:

::

   cluster = sxclient.Cluster('my.cluster.example.com')

If the passed name is not a FQDN, you should pass an IP address too. It will be
used to communicate with the cluster in place of name.

::

   cluster = sxclient.Cluster('clustername', ip_address='127.0.0.1')

In case you don't want the connection to be secured by SSL, set ``is_secure``
to ``False``:

::

   cluster = sxclient.Cluster('my.cluster.example.com', is_secure=False)

You can also pass a custom port number:

::

   cluster = sxclient.Cluster('my.cluster.example.com', port=8000)


Initializing UserData object
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

There are multiple initialization methods for UserData. You can provide a path
to the key file:

::

   user_data = sxclient.UserData.from_key_path('/path/to/keyfile')

The key itself can be provided too — either encoded in base64:

::

   user_data = sxclient.UserData.from_key('ZP1rHyR0QB6zEvCwYexGl9SF1G143C/D2hG9rEisLL2zJV3kWQvtAwAA')

or in its binary form:

::

   user_data = sxclient.UserData('d\xfdk\x1f$t@\x1e\xb3\x12\xf0\xb0a\xecF\x97\xd4\x85\xd4mx\xdc/\xc3\xda\x11\xbd\xacH\xac,\xbd\xb3%]\xe4Y\x0b\xed\x03\x00\x00')

You can also initialize the object with username and password (and cluster
UUID):

::

   user_data = sxclient.UserData.from_userpass_pair('a_user', 'a_password', '10ca10ca-10ca-10ca-10ca-10ca10ca10ca')


Initializing SXController object
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

After preparing Cluster and UserData objects an SXController object can be 
created:

::

   sx = sxclient.SXController(cluster, user_data)

In order to use a custom CA certificate for verification, pass a path to CA
bundle in ``verify`` parameter:

::

   sx = sxclient.SXController(cluster, user_data, verify='/path/to/ca/bundle')

You can then get all available commands from 

::

   print sx.available_operations

You can call any operation via

::

   sx.listUsers.call(...)

The return value is a HTTP response object holding the response from SX server. 
If a command supports JSON format (as most of them use) you can call it directly:

::

   sx.listUsers.json_call(...)

After you are done working with SXController gracefuly close it:

::

   sx.close()


Running an operation
^^^^^^^^^^^^^^^^^^^^

Currently the following operations are available::

   createBlocks
   createUser
   createVolume
   deleteFile
   deleteVolume
   flushUploadedFile
   getBlocks
   getClusterMetadata
   getClusterStatus
   getFile
   getFileMeta
   getNodeStatus
   getVolumeACL
   initializeAddChunk
   initializeFile
   listFileRevisions
   listFiles
   listNodes
   listUsers
   listVolumes
   locateVolume
   modifyUser
   modifyVolume
   removeUser
   setClusterMetadata
   setVolumeACL
   updateVolumeACL
   whoAmI


High level operations
^^^^^^^^^^^^^^^^^^^^^

Since uploading and downloading files requires some low level knowledge about 
underlying SX protocol we give helpers to simplify that. For a given 
SXController if you wish to upload file use:

::

   import os
   file_size = os.stat('myfile.txt').st_size
   uploader = sxclient.SXFileUploader(sxcontroller)
   with open('myfile.txt', 'r') as fo:
      uploader.upload_stream('my-volume', file_size, 'my_new_file_name.txt', fo)

and if you wish to download file use:

::

   downloader = sxclient.SXFileDownloader(sxcontroller)
   content = downloader.get_file_content('my-volume', 'my_new_file_name.txt')


For more information regarding usage of a specific objects see its
docstring. For example, to see the description for ``listVolumes``, you can use
the Python built-in ``help`` function::

   >>> help(sx.listVolumes)

or ``pydoc`` while in the shell::
   
   $ pydoc sx.listVolumes
