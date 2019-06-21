(function ($) {
  // adds a keyboard-focus class when keyboard is used.
  $(document).on('keyup', function (e) {
    $('body').addClass('keyboard-focus');
  });

  $(document).on('mousemove click', function (e) {
    $('body').removeClass('keyboard-focus');
  });

})(jQuery, Drupal);
