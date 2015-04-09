/* This Source Code Form is subject to the terms of the Mozilla Public
* License, v. 2.0. If a copy of the MPL was not distributed with this
* file, You can obtain one at http://mozilla.org/MPL/2.0/. */

;(function($, Spinner) {

    'use strict';

    var COUNTRY_CODE = '';
    var $form = $('#send-to-device-form');
    var $label = $form.find('#form-input-label');
    var $input = $form.find('#id-input');

    /*
     * Initializes the page form based on the user's geo location.
     * Visitors in the US will be shown both the sms form and the email form.
     * Visitors in all other countries will get only the email form
     */
    function initGeoLocation() {
        // should geo.mozilla.org be slow to load for some reason,
        // just show the email form anyway after 5 seconds waiting.
        var formTimeout = setTimeout(showForm, 5000);
        var formLoaded = false;

        $.getScript('//geo.mozilla.org/country.js')
            .done(function(script, textStatus) {
                if (textStatus === 'success') {
                    try {
                        COUNTRY_CODE = geoip_country_code().toLowerCase();
                    } catch (e) {
                        COUNTRY_CODE = '';
                    }
                }
                showForm();
            })
            .fail(function() {
                // something went wrong, show the email form anyway.
                showForm();
            });

        function showForm() {
            clearTimeout(formTimeout);
            // should showForm have already been called, do nothing.
            if (formLoaded) {
                return;
            }
            formLoaded = true;

            // if the page visitor is in the US, show the SMS form and set as active.
            // can also append '?geo=us' query param for easier testing/debugging
            if (COUNTRY_CODE === 'us' || window.location.href.indexOf('?geo=us') !== -1) {
                // TODO show SMS messaging
                $form.addClass('us');
                $label.html($label.data('alt'));
                $input.attr('placeholder', $input.data('alt'));
            }
        }
    }

    initGeoLocation();

})(window.jQuery, window.Spinner);
