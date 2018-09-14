/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const createTweetElement = function (tweetObj) {
    //create tags for four parts of the tweet
    let $article = $('<article>').addClass('tweet');
    let $header = $('<header>').addClass('tweet');
    let $footer = $('<footer>').addClass('tweet');
    let $content = $('<p class="tweet">').text(tweetObj.content.text);
    //create the sub-parts and insert content
    let $username = $('<h2>').addClass('userName').append(tweetObj.user.name)
    let $account = $('<p>').addClass('account').append(tweetObj.user.handle)
    let $img = $('<img class="avatar">');
    $img.attr('src', tweetObj.user.avatars.small);
    let $date = $('<p>').addClass('date').append(moment(tweetObj.created_at).fromNow());
    let $like = $('<input>').addClass('footbtn').attr({"type": 'image', 'src': "/images/flag.png"})
    let $flag = $('<input>').addClass('footbtn').attr({'type': 'image', 'src':"images/like.png"})
    let $retweet = $('<input>').addClass('footbtn').attr({'type': 'image', 'src':"images/retweet.png"})
    //put parts together
    $header.append($img);
    $header.append($username);
    $header.append($account);
    $footer.append($date);
    $footer.append($like);
    $footer.append($flag);
    $footer.append($retweet);
    $article.append($header);
    $article.append($content);
    $article.append($footer);

    return $article;
  }



  function renderTweets(tweets) {
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
  if (!words) {
    $('.error').text('Input required!');
  } else if (words > 140) {
    $('.error').text('Invalid input!');
  } else {
  //Submit using ajax
    $.ajax('/tweets/', {
      method: 'POST',
      data: formData
    }).then(function() {
      $('textarea#text').val('');
      $('#count').text('140');
      $('#tweet-container').empty();
      $('.error').text('');
      return $.ajax('/tweets/');
    }).then(renderTweets);
    }
  })

  let loadTweets = function () {
    $.ajax('/tweets/', { method: 'GET' })
    .then(function (tweetlog) {
      renderTweets(tweetlog);
    })
  };

  loadTweets();

  //Hide the textarea when "compose" is clicked
  $(function() {
    $('#compose').click(function() {
      if($('.new-tweet').is(':hidden')) {
        $('.new-tweet').slideDown('slow');
        $('textarea').focus();
      } else {
        $('.new-tweet').fadeOut();
      }
    })
  });
});
