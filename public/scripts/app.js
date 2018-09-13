/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

const createTweetElement = function (tweetObj) {
  let $article = $('<article>').addClass('tweet');
  let $header = $('<header>').addClass('tweet');
  let $footer = $('<footer>').addClass('tweet');
  let $content = $('<p class="tweet">').append(tweetObj.content.text);
  
  let $username = $('<h2>').addClass('userName').append(tweetObj.user.name)
  let $account = $('<p>').addClass('account').append(tweetObj.user.handle)
  let $img = $('<img class="avatar">');
  $img.attr('src', tweetObj.user.avatars.small);
  let $date = $('<p>').append(tweetObj.created_at);
  $header.append($img);
  $header.append($username);
  $header.append($account);
  $footer.append($date);
  $article.append($header);
  $article.append($content);
  $article.append($footer);

  return $article;
}

function renderTweets(tweets) {
  let input;
  for (twe of tweets) {
    input = createTweetElement(twe)
    $('#tweet-container').prepend(input);
  }
}


$('form#tweet-post').on('submit', function(e) {
  e.preventDefault();

  //Grab the content of the form
  let formData = $('form#tweet-post').serialize();

  //Validating text length
  let words = $('textarea').val().length
  if (!words || words > 140) {
    alert('NOOOOOOOOOOOOOOOOOOOOO!');
    return;
  }

  
  //Submit using ajax
  $.ajax('/tweets/', {
    method: 'POST',
    data: formData
  }).then(function() {
    $('textarea#text').val('');
    $('#tweet-container').empty();
    return $.ajax('/tweets/');
  }).then(renderTweets);
})

let loadTweets = function () {
  $.ajax('/tweets/', { method: 'GET' })
  .then(function (tweetlog) {
    renderTweets(tweetlog);
  })
};

loadTweets();

});
