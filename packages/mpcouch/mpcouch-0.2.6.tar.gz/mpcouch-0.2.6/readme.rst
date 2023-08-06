Multiprocess Bulk Uploading to CouchDB
######################################

Status
======

This is not yet finished, but can already be used.

History
=======

v 0.2.6
-------

* Introduced the ``jobsbuffersizemax`` argument to limit the amount of upload-processed buffered in working memory. Now it is possible to work on data of infinite size.

v 0.2.5
-------

* only spawn one concurrent process for performing uploads

v 0.2.4
-------

* working version, still spans unlimited amount of processes


Usage
=====

Create a new mpcouchPusher object

.. code-block::
    
    myCouchPusher = mpcouch.mpcouchPusher( "http://localhost:5984/myDatabase", 30000 )

Use this object every time you have one single document ready to be stored in the database:

.. code-block::
    
    myCouchPusher.pushData(myNewDocument)

The module will collect all documents until the threshold is reached (in our example this would be the 30000 specified above) and upload them as a batch to the CouchDB also specified at creation time of the object (myCouchDbDatabase).

Since every bulk-upload is performed by a single process, the original program continues while the upload happens in the background.

To wait for all running uploads to finish and to make sure the very last batch of documents gets pushed to the server, run

.. code-block::
    
    myCouchPusher.finish()

after your final document was sent to pushData.
The module now waits for all the uploads to finish and uploads the final bulk of collected documents.
