/*globals jQuery, document */
/*jslint sloppy: true, vars: true, white: true, maxerr: 50, indent: 4 */
/*
 * This is the javascript that looks for overlays
 */
(function(jQuery) {

  /*
   * Initialize overlay for the element
   */
  function init_overlay(idx, el, subtype) {
    var options;
    subtype = subtype || 'ajax';
    el = jQuery(el);
    try {
      options = JSON.parse(el.attr('data-overlay-options'));
    } catch (e) {
      options = {};
    }

    if (options.subtype === undefined) {
      options.subtype = subtype;
    }
    el.prepOverlay(options);
  }

  /*
   * Apply an overlay to all the links with class infoIco like
   */
  function configure_overlays() {
    jQuery('[data-overlay]').each(function(idx, el) {
      init_overlay(idx, el);
    });
    jQuery('[data-overlay-ajax]').each(function(idx, el) {
      init_overlay(idx, el, 'ajax');
    });
    jQuery('[data-overlay-iframe]').each(function(idx, el) {
      init_overlay(idx, el, 'iframe');
    });
    jQuery('[data-overlay-image]').each(function(idx, el) {
      init_overlay(idx, el, 'image');
    });
  }
  jQuery(document).ready(configure_overlays);
}(jQuery));
