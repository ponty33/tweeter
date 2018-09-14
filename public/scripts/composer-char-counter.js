$(document).ready(function() {
  var maxLength = 140;
  var count = $('#count');
  $('textarea').keyup(function() {
    var length = $(this).val().length;
    var input = maxLength - length;
    count.text(input);
    if (input < 0) {
      count.addClass('red');
    } else {
      count.removeClass('red');
    }
  })
});

