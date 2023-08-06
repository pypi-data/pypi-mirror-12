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
