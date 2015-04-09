.. This Source Code Form is subject to the terms of the Mozilla Public
.. License, v. 2.0. If a copy of the MPL was not distributed with this
.. file, You can obtain one at http://mozilla.org/MPL/2.0/.

.. _sendtodevice:

==============
Send to Device
==============

The *Send to Device* widget is a single form enabling the sending of a download link for either Firefox for iOS, Firefox for Android, or both.

The form allows sending via SMS or Email, although the SMS copy/messaging is shown only to those in the US. Geo-location handled in JavaScript using `GeoDude <https://github.com/mozilla/geodude>`_.

The form is shown to a limited set of locales who are set up to receive emails. For those locales not in the list, direct links to the respective app stores are shown instead. The list of locales is in ``settings/base.py``.

Add to page:

1. Include this macro::

    {% from "macros.html" import send_to_device with context %}

2. Make sure necessary files are in your CSS/JS bundles:

  - CSS: ``'css/base/send-to-device.less'``

  - JS: ``'js/base/send-to-device.js'``

3. Include the macro in your page template::

    {{ send_to_device() }}

  The macro defaults to sending links for both Android and iOS apps. You can also pass a 'platform' to specify different configuration options::

      {{ send_to_device(platform='select') }}

  * ``select`` shows a drop down so the user can choose their platform.
  * ``ios`` sends the user a link to Firefox for iOS only.
  * ``android`` sends the user a link to Firefox for Android only.

Example
-------

You can view a simple example by navigating to ``/styleguide/docs/send-to-device/`` in your local development environment (not available in production).
