var url='http://api.icndb.com/jokes/random';

var $button  = $('#get-joke').on('click', function() {
	getJoke();
});

var $paragraph = $('#joke');

function getJoke(){
	$.ajax({
		method: 'GET',
		url: url,
		success: function(res) {
			$paragraph.text(res.value.joke);
		}

	});
}

var myweb = "https://joanb2.github.io/exercise_12_5/";
var prefix = "https://cors-anywhere.herokuapp.com/";
var tweetLink = "https://twitter.com/intent/tweet?text=";
var quoteUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";


function getQuote() {
	$.ajax({
	    dataType: "json",
	    url: prefix + quoteUrl,
	    data: myweb,
	    success: createTweet
	});

	$.ajaxSetup({ cache: false });
}

function createTweet(input) {
	(!input.length) return;
	var data = input[0];
    var quoteText = $(data.content).text().trim();
    var quoteAuthor = data.title;

    if (!quoteAuthor.length) {
        quoteAuthor = "Unknown author";
    }
	var tweetText = "Quote of the day - " + quoteText + " Author: " + quoteAuthor;

	if (tweetText.length > 140) {
    	getQuote();
	} else {
	    var tweet = tweetLink + encodeURIComponent(tweetText);
	    $('.quote').text(quoteText);
	    $('.author').text("Author: " + quoteAuthor);
	    $('.tweet').attr('href', tweet);
	}
}

$(document).ready(function(){
	getQuote();
	$('.trigger').on('click', function(){
		getQuote();
	})
});