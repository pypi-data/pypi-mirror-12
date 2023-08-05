Writeback
=========

Writeback is a pluggable customizable Django app to collect feedback from site visitors using AJAX.

Installation
------------

Install using pip::

    pip install django-writeback

Quick start
-----------

+ Add "writeback" to your INSTALLED_APPS setting like this::

        INSTALLED_APPS += ('writeback', )

+ Add context processor to your TEMPLATE_CONTEXT_PROCESSORS setting like this::

        TEMPLATE_CONTEXT_PROCESSORS += ('writeback.context.add_form', )

+ Specify email settings WRITEBACK_EMAIL_NOTIFICATION_SUBJECT, WRITEBACK_EMAIL_NOTIFICATION_FROM and WRITEBACK_EMAIL_NOTIFICATION_TO_LIST. These will be used in email notifications.

+ Run ``python manage.py syncdb`` to synchronize the database.

+ Run ``python manage.py collectstatic`` or ``python manage.py collectstatic -i admin``, if you want to omit collecting static for the admin app.

+ Include the writeback URLconf in your project urls.py like this::

        url(r'^writeback/', include('writeback.urls')),

+ Modify your base template::

        <!-- in header block -->
        {% include "writeback/header.html" %}
        
        <!-- in body block -->
        {% include "writeback/button.html" %}

+ Override ``email_notification.html`` and ``button.html`` templates.

Model customization
-------------------

The ``Message`` model, which is used for collecting feedback, can be extended:

+ Create an app, for example ``custom_writeback`` with a file, which shall contain class declaration, name it, ``classes.py``, for example.

+ Add this newly created app to your ``INSTALLED_APPS`` setting like this::

        INSTALLED_APPS += ('custom_writeback', )

+ Declare your abstract model class anew or, if you want to extend the base model, inherit it from ``writeback.models.MessageAbstract`` like so::

        from writeback.models import MessageAbstract


        class MyMessageAbstract(MessageAbstract):
            # define your custom fields

            class Meta(MessageAbstract.Meta):
                pass

+ Register your class in the project's ``settings.py``::

        WRITEBACK_MESSAGE_BASE_MODEL = 'custom_writeback.models.MyMessageAbstract'

