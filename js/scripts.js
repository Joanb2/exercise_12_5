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