******************
django-lab-members
******************

``django-lab-members`` is a Django app to display lab personnel and information about them. This app can be extended by ``djangocms-lab-members`` for use with django CMS.

Source code is available on GitHub at `mfcovington/django-lab-members <https://github.com/mfcovington/django-lab-members>`_. Information about and source code for ``djangocms-lab-members`` is available on GitHub at `mfcovington/djangocms-lab-members <https://github.com/mfcovington/djangocms-lab-members>`_.


.. contents:: :local:


Installation
============

**PyPI**

.. code-block:: sh

    pip install django-lab-members

**GitHub**

.. code-block:: sh

    pip install https://github.com/mfcovington/djangocms-lab-members/releases/download/0.3.0/djangocms-lab-members-0.3.0.tar.gz


Configuration
=============

- Edit the project's ``settings.py`` file.

  - Add ``lab_members`` and its dependencies to your ``INSTALLED_APPS`` setting:

    .. code-block:: python

        INSTALLED_APPS = (
            # ...
            'lab_members',
            'easy_thumbnails',
            'filer',
            'mptt',
            'sekizai',
            'friendlytagloader',
        )

  - Specify your media settings, if not already specified:

    .. code-block:: python

        MEDIA_URL = '/media/'
        MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

  - Add ``easy_thumbnail`` settings: 

    .. code-block:: python

        # For easy_thumbnails to support retina displays (recent MacBooks, iOS)
        THUMBNAIL_HIGH_RESOLUTION = True
        THUMBNAIL_QUALITY = 95
        THUMBNAIL_PROCESSORS = (
            'easy_thumbnails.processors.colorspace',
            'easy_thumbnails.processors.autocrop',
            'filer.thumbnail_processors.scale_and_crop_with_subject_location',
            'easy_thumbnails.processors.filters',
        )
        THUMBNAIL_PRESERVE_EXTENSIONS = ('png', 'gif')
        THUMBNAIL_SUBDIR = 'versions'

  - Add ``sekizai`` settings:

    - For **Django 1.7**, add ``sekizai.context_processors.sekizai`` to ``TEMPLATE_CONTEXT_PROCESSORS``:

      .. code-block:: python

          from django.conf.global_settings import TEMPLATE_CONTEXT_PROCESSORS
          TEMPLATE_CONTEXT_PROCESSORS += ('sekizai.context_processors.sekizai',)

    - For **Django 1.8**, add ``sekizai.context_processors.sekizai`` to ``TEMPLATES``:

      .. code-block:: python

          TEMPLATES = [
              {
                  # ...
                  'OPTIONS': {
                      'context_processors': [
                          # ...
                          'sekizai.context_processors.sekizai',
                      ],
                  },
              },
          ]


- Include URL configurations for ``lab_members`` and media (if ``DEBUG == True``) in your project's ``urls.py`` file:

  - For **Django 1.7**:

    .. code-block:: python

        # ...
        from django.conf import settings

        urlpatterns = patterns('',
            # ...
            url(r'^lab_members/', include('lab_members.urls', namespace='lab_members')),
            # ...
        )

        if settings.DEBUG:
            urlpatterns += patterns('',
                (r'^media/(?P<path>.*)$', 'django.views.static.serve', {
                'document_root': settings.MEDIA_ROOT}))

  - For **Django 1.8**:

    .. code-block:: python

        # ...
        from django.conf import settings
        from django.conf.urls.static import static

        urlpatterns = [
            # ...
            url(r'^lab_members/', include('lab_members.urls', namespace='lab_members')),
            # ...
        ]

        if settings.DEBUG:
            urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


Migrations
==========

Create and perform migrations for ``lab_members`` and its dependencies:

.. code-block:: sh

    python manage.py makemigrations lab_members
    python manage.py migrate


Usage
=====

- Start the development server:

.. code-block:: sh

    python manage.py runserver


- Login and add a scientist: ``http://localhost:8000/admin/lab_members/scientist/add/``
- Visit: ``http://127.0.0.1:8000/lab_members/``


*Version 0.3.0*


Revision History
================

0.3.0 2015-11-09

- Add current title and institution for alumni
- Allow multiple co-advisors for an Education/Employment record
- Move Scientist's research interests before personal interests
- Prevent deletion of an object in a one-to-many relationship with another object

  - Exception: deleting a scientist will delete related education/employment records

- Override OS X's hidden scrollbars for Employment/Education tables on narrow screens
- Improve related names for FKs and many-to-many fields
- Fix Scientist's website link
- Fix disappearing sidebar placeholder when CMS is placed in 'Structure' mode
- Resolve Django 1.8 warnings
- Add usage instructions for Django 1.8 compatibility
- Prepare for distribution via PyPI


0.2.5 2015-05-22

- Add Scientist publications placeholder
- Add Admin models for Education/Employment Records
- Fix ordering of Education/Employment Records


0.2.4 2015-05-08

- Display Scientist only if visible == True
- Prevent higher resolution photos from being wider than 300px
- Fix linking to Lab Alumni subsection
- Validate that Employment/Education 'Year Started' <= 'Year Ended'
- Open advisor's link in a new window
- Make alumni link more prominent
- Add website field for Scientist & display below email address
- Move sidebar to modal for smaller screens
- Minor behind-the-scenes improvements


0.2.3 2015-04-29

- Make profile thumbnails equal heights (within row) to account for long names
- Use ``django-friendly-tag-loader`` to load and use django CMS tags if they are available
- Use 2x resolution photos (for retina, etc. displays)


0.2.2 2015-04-21

- Add Scientist sidebar placeholder if CMS for medium+ screens
- Improve styling


0.2.1 2015-04-19

- Improve styling


0.2.0 2015-04-10

- Allow integration with django CMS using ``djangocms-lab-members``


0.1.0 2015-04-08

- A Django app to display lab personnel and information about them


