(function($, Drupal, window, document) {
  'use strict';

  // DO NOT USE! MEANT FOR EXAMPLE PURPOSES.
  // Try to avoid having a global.js file. Only use small, js files.

  // Example of Drupal behavior loaded.
  Drupal.behaviors.themeJS = {
    attach: function(context, settings) {
      if (typeof context['location'] !== 'undefined') { // Only fire on document load.

        /* code goes here */

      }
    }
  };

})(jQuery, Drupal, this, this.document);
