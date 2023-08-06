OttawaCityJobs
======================================================

Yet another city jobs scrapper

Installation
------------

.. code:: sh
		[sudo] pip install ottawacityjobs

Usage
-----

.. code:: python
import ottawacityjobs as p

results = p.get_website_content() #Retrieves the full jobs description
results  = .get_jobs(results) #retrieve all the jobs title and their url


