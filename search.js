// JavaScript Braindump YouTube Search search.js JavaScript Document
var results = [];

$(function () {
	$('#searchForm').submit(function (event) {
		console.log('submitted');
		var query = $('#query').val();
		//Get the YouTube search results
		$.get('http://gdata.youtube.com/feeds/api/videos?q=' + query +
			'&orderby=relevance&start-index=' + 1 +
			'&max-results=15&format=5&v=2&alt=json', function (json) {
            results = [];
            var media = null;
            if (json.feed.entry) {
                for (var i = 0; i < json.feed.entry.length; i++) {
                    media = json.feed.entry[i].media$group;

                    results.push({
                        id:  media.yt$videoid.$t,            		// ID
                        title: media.media$title.$t,           		// Title
                        duration: media.yt$duration.seconds,      	// Duration (sec)
                        thumbnail: media.media$thumbnail[0].url,   	// Thumbnail
                        coverPhoto: media.media$thumbnail[2].url}); // Cover photo
                }
                makeList();
            }

        }, 'json');
        event.preventDefault();
	});
});

function makeList() {
	var $results = $('#results').empty().append($('<ul>'));
	for (var i = 0; i < results.length; i++) {
		var result = $('<li>').text(results[i].title);
		var image  = $('<img src="' + results[i].thumbnail + '" >"');
		result.prepend(image);

		$results.append(result);
	}
}