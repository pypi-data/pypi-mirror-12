========
pygradle
========
**Python gradle wrapper**

Overview
--------

*pygradle* is an wrapper for gradle, the modern open source build automation
system. Its goal is to call gradle command and configuration from python script.


Usage
-----
It's helpful to use pygradle and `pytractor <https://github.com/kpodl/pytractor/>` for testing ex. java web application in python.


Basic
_____
You can create Gradle wrapper from factory
::

  from pygradle import gradlew

  gradle = GradleFactory.create(gradle_cmd='/path/to/gradle')
  
  gradle.build()


GradleFactory reads all tasks from gradle. Creation of gradle wrapper with factory
is slow because factory is asking real gradle for tasks. Instead of that you can use:

::

  from pygradle import gradlew

  gradle = gradlew.Gradle(gradle_cmd='/path/to/gradle')
  
  gradle.clean()
  
  gradle.add_tasks('package:build', 'package2:build').parallel().execute()


Which is quicker.

Missing Features
----------------
- Gradle task configuration
- Rest options
- Finds better way to check exection status.
