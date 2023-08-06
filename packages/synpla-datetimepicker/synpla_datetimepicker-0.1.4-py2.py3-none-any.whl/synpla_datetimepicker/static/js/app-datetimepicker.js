/*global jQuery */

(function(window, $) {
	'use strict';

	$(function() {
    $('.datetimepicker').each(function() {
      var widget_pos_horiz = $(this).attr('data-widget-pos-horiz')
        ? $(this).attr('data-widget-pos-horiz')
        : 'auto';

      var widget_pos_vert = $(this).attr('data-widget-pos-vert')
        ? $(this).attr('data-widget-pos-vert')
        : 'auto';

      var format = $(this).attr('data-format')
        ? $(this).attr('data-format')
        : 'YYYY-MM-DD HH:mm:ss';

      $(this).datetimepicker({
        format: format,
        widgetPositioning: {horizontal: widget_pos_horiz, vertical: widget_pos_vert}
      });
    });
  });
})(window, jQuery);
