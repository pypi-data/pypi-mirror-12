.. image:: https://leantesting.com/themes/bugtrackin/images/navbar-logo-v2@2x.png
Lean Testing Python SDK
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Python client for Lean Testing API <https://leantesting.com/en/api-docs>

----------

* Including Lean Testing Python SDK
.. code:: python
	from LeanTestingSDK.Client import Client as LeanTestingClient

* Creating a new instance
.. code:: python
	LT = LeanTestingClient()

----------

* Get Current **Token**
.. code:: python
	LT.getCurrentToken()

* Attach New **Token**
.. code:: python
	LT.attachToken('9ErdKZXpGPnvHuJ9di92eAFqrp14GKvfHMyclGGh')

* Generate **Authorization URL**
.. code:: python
	generatedURL = LT.auth.generateAuthLink(
		'DHxaSvtpl91Xos4vb7d0GKkXRu0GJxd5Rdha2HHx',
		'https://www.example.com/appurl/',
		'admin',
		'a3ahdh2iqhdasdasfdjahf26'
	)
	print( generatedURL )

* Exchange Authorization Code For **Access TOKEN**
.. code:: python
	token = LT.auth.exchangeAuthCode(
		'DHxaSvtpl91Xos4vb7d0GKkXRu0GJxd5Rdha2HHx',
		'DpOZxNbeL1arVbjUINoA9pOhgS8FNQsOkpE4CtXU',
		'authorization_code',
		'sOgY2DT47B2K0bqashnk0E6wUaYgbbspwdy9kGrk',
		'https://www.example.com/appurl/'
	)
	print( token )

----------

* Get **User** Information
.. code:: python
	LT.user.getInformation()

* Get **User** Organizations
.. code:: python
	LT.user.organizations.all().toArray()

----------

* List All **Projects**
.. code:: python
	LT.projects.all().toArray()

* Create A New **Project**
.. code:: python
	newProject = LT.projects.create({
		'name': 'Project135',
		'organization_id': 5779
	})
	print( newProject.data )

* Retrieve An Existing **Project**
.. code:: python
	LT.projects.find(3515).data


* List **Project Sections**
.. code:: python
	LT.projects.find(3515).sections.all().toArray()

* Adding A **Project Section**
.. code:: python
	newSection = LT.projects.find(3515).sections.create({
		'name': 'SectionName'
	})
	print( newSection.data )


* List **Project Versions**
.. code:: python
	LT.projects.find(3515).versions.all().toArray()

* Adding A **Project Version**
.. code:: python
	newVersion = LT.projects.find(3515).versions.create({
		'number': 'v0.3.1104'
	})
	print( newVersion.data )


* List **Project Users**
.. code:: python
	LT.projects.find(3515).users.all().toArray()


* List **Bug Type Scheme**
.. code:: python
	LT.projects.find(3515).bugTypeScheme.all().toArray()

* List **Bug Status Scheme**
.. code:: python
	LT.projects.find(3515).bugStatusScheme.all().toArray()

* List **Bug Severity Scheme**
.. code:: python
	LT.projects.find(3515).bugSeverityScheme.all().toArray()

* List **Bug Reproducibility Scheme**
.. code:: python
	LT.projects.find(3515).bugReproducibilityScheme.all().toArray()

----------

* List All **Bugs** In A Project
.. code:: python
	LT.projects.find(3515).bugs.all().toArray()

* Create A New **Bug**
.. code:: python
	newBug = LT.projects.find(3515).bugs.create({
		'title': 'Something bad happened...',
		'status_id': 1,
		'severity_id': 2,
		'project_version_id': 10242
	})
	print( newBug.data )

* Retrieve Existing **Bug**
.. code:: python
	LT.bugs.find(38483).data

* Update A **Bug**
.. code:: python
	updatedBug = LT.bugs.update(118622, {
		'title': 'Updated title',
		'status_id': 1,
		'severity_id': 2,
		'project_version_id': 10242
	})
	print( updatedBug.data )

* Delete A **Bug**
.. code:: python
	LT.bugs.delete(118622)

----------

* List Bug **Comments**
.. code:: python
	LT.bugs.find(38483).comments.all().toArray()

----------

* List Bug **Attachments**
.. code:: python
	LT.bugs.find(38483).attachments.all().toArray()

* Upload An **Attachment**
.. code:: python
	filePath = '/place/Downloads/Images/1370240743_2294218.jpg'
	newAttachment = LT.bugs.find(38483).attachments.upload(filePath)
	print( newAttachment.data )

* Retrieve An Existing **Attachment**
.. code:: python
	LT.attachments.find(21515).data

* Delete An **Attachment**
.. code:: python
	LT.attachments.delete(75258)

----------

* List **Platform Types**
.. code:: python
	LT.platform.types.all().toArray()

* Retrieve **Platform Type**
.. code:: python
	LT.platform.types.find(1).data


* List **Platform Devices**
.. code:: python
	LT.platform.types.find(1).devices.all().toArray()

* Retrieve Existing **Device**
.. code:: python
	LT.platform.devices.find(11).data


* List **OS**
.. code:: python
	LT.platform.os.all().toArray()

* Retrieve Existing **OS**
.. code:: python
	LT.platform.os.find(1).data

* List **OS Versions**
.. code:: python
	LT.platform.os.find(1).versions.all().toArray()


* List **Browsers**
.. code:: python
	LT.platform.browsers.all().toArray()

* Retrieve Existing **Browser**
.. code:: python
	LT.platform.browsers.find(1).data

* List **Browser Versions**
.. code:: python
	LT.platform.browsers.find(1).versions.all().toArray()

----------

- Using **Filters**
.. code:: python
	LT.projects.find(3515).bugs.all({'limit': 2, 'page': 5}).toArray()

- **Entity List** Functions
.. code:: python
	browsers = LT.platform.browsers.all()
	print( browsers.total() )
	print( browsers.totalPages() )
	print( browsers.count() )
	print( browsers.toArray() )

- **Entity List** Iterator
When used in for loops, entity lists will automatically cycle to first page, regardless of `page` filter.
After ending the loop, the entity list will **NOT** revert to first page or the initial instancing `page` filter setting in order not to cause useless API request calls.
.. code:: python
	comments = LT.bugs.find(38483).comments.all({'limit': 1})
	for page in comments:
		print( page )

- **Entity List** Manual Iteration
.. code:: python
	comments = LT.bugs.find(38483).comments.all({'limit': 1})
	print( comments.toArray() )

	# Will return false if unable to move forwards
	comments.next();      print( comments.toArray() )

	# Will return false if already on last page
	comments.last();      print( comments.toArray() )

	# Will return false if unable to move backwards
	comments.previous();  print( comments.toArray() )

	# Will return false if already on first page
	comments.first();     print( comments.toArray() )

----------
