=============================
testpad
=============================

.. image:: https://badge.fury.io/py/testpad.png
    :target: https://badge.fury.io/py/testpad

.. image:: https://travis-ci.org/milin/testpad.png?branch=master
    :target: https://travis-ci.org/milin/testpad

Screenshot and Annotate and send to django backend.

Documentation
-------------

The full documentation is at https://testpad.readthedocs.org.

Quickstart
----------

Install testpad::

    pip install testpad

Then use it in a project by updating your settings file::

     INSTALLED_APPS += (
     'settings_context_processor',
     'testpad',
     )
     TEMPLATE_CONTEXT_PROCESSORS += ('settings_context_processor.context_processors.settings', )
     USE_TESTPAD = True
     TESTPAD_AJAX_URL = 'Insert API where screenshot is posted.'

     # for settings_context_processor
     TEMPLATE_VISIBLE_SETTINGS = (
           'USE_TESTPAD',
           'TESTPAD_AJAX_URL',
    )
    
Add this block to your base template::

    {# JS block for automated QA utility to create bugs in Jira #}
    {# Will be turned off for production #}
    {% if USE_TESTPAD %}
        <script src="{{ STATIC_URL }}js/testpad/lib/feedback.js"></script>
        <link rel="stylesheet" href="{{ STATIC_URL }}css/testpad/lib/feedback.min.css" />
        <script type="text/javascript">
            $.feedback({
                ajaxURL: "{{ TESTPAD_AJAX_URL }}",
                html2canvasURL: "{{ STATIC_URL }}js/testpad/lib/html2canvas.js" 
            });
        </script>
    {% endif %}



Features
--------
* Captures screenshot based on https://github.com/ivoviz/feedback for django apps.
* Uses django_settings_context_processor to make settings constant available in your base templates.

TestPad client that includes all the javascript magic to make screenshotting and annotations happen.

Django App for https://github.com/ivoviz/feedback
