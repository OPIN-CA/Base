(function ($, Drupal) {
  Drupal.behaviors.mobileMenu = {
    attach: function (context, settings) {

      /*
       * Mobile Navigation - Mobile Menu Button logic
       */
      var mobileNav = $('.region-mobile-navigation__content');
      var mobileNavButton = $('.mobile-navigation-button__toggle');

      // When esc key is pressed, close menu
      $(document).on('keyup', function (e) {
        if (e.which === 27) {
          closeMenu();
        }
      });

      // On mobile, Close the menu if focus is out of the dropdown.
      $(document).focusin(function (e) {
        var isFocusInMenu = Boolean($(e.target).parents('.region-mobile-navigation__content').length);

        if (!isFocusInMenu && $('body').hasClass('keyboard-focus')) {
          mobileNav.attr('aria-hidden', 'true');
          $('.mobile-navigation-button__toggle').attr('aria-expanded', 'false');
          mobileNav.find('.subnav__button').attr('aria-expanded', false);
          mobileNav.find('.nav__subnav').attr('aria-hidden', true);
        }
      });


      $(document).mouseup(function (e) {

        var container = $(".region-mobile-navigation__content");

        // if the target of the click isn't the container nor a descendant of the container
        if (!container.is(e.target) && container.has(e.target).length === 0) {
          if ($(window).width < 768) {
            closeMenu();
          } else {
            container.find('.subnav__button').attr('aria-expanded', false);
            container.find('.nav__subnav').attr('aria-hidden', true);
          }
        }
      });

      // Set aria-expand value when mobile menu button is selected.
      $('.mobile-navigation-button__toggle', context).on('click keyUp', function () {
        var expandedValue = $(this).attr("aria-expanded");

        if (expandedValue == "true") {
          expandedValue = "false";
          closeMenu();
        } else {
          expandedValue = "true";
          openMenu()
        }
        $(this).attr("aria-expanded", expandedValue);
      });

      function openMenu() {
        mobileNav.attr('aria-hidden', 'false');
        mobileNavButton.attr('aria-expanded', 'true');
        mobileNav.find('> ul:first-of-type > li:first-of-type > a').focus();
      }

      function closeMenu() {
        mobileNav.attr('aria-hidden', 'true');
        mobileNavButton.attr('aria-expanded', 'false');
        $('.mobile-navigation-button__toggle').focus();
      }

      /*
       * Mobile Navigation -- Sub-Navigation Logic
       */

      $('.region-mobile-navigation__content .has-subnav.is-expanded', context).each(function () {
        // replace all special characters
        var navTitle = $(this).children('a').text().replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-').toLowerCase();
        $(this).children('a').attr('id', 'mobile-menu--' + navTitle);

        //
        $(this).children('button').attr('aria-controls', 'mobile-menu-accordion--' + navTitle);
        $(this).children('ul').attr({
          'id': 'mobile-menu-accordion--' + navTitle,
          'aria-labelledby': 'mobile-menu--' + navTitle
        });
      });

      $('.subnav__button', context).on('click keyUp', function () {
        // close other dropdowns
        $(this).parent().siblings().find('.subnav__button').attr('aria-expanded', false);
        $(this).parent().siblings().find('.nav__subnav').attr('aria-hidden', true);


        var expandedValue = $(this).attr("aria-expanded");

        if (expandedValue == "true") {
          expandedValue = "false";
          $(this).siblings('ul').attr('aria-hidden', true);
        } else {
          expandedValue = "true";
          $(this).siblings('ul').attr('aria-hidden', false);
        }
        $(this).attr("aria-expanded", expandedValue);
      });
    }
  };
})(jQuery, Drupal);
