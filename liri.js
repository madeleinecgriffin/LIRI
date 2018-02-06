//requirements
var keys = require('./keys')
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');


//keys
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var omdbKey = "34b60929";


//store user inputs
var inputCommand = process.argv[2];
var inputCommandName = process.argv[3];


//functions for each task
var getTweets = function() {
	client.get('search/tweets', {q: 'retweet_cats'}, function(error, tweets, response) {
		console.log(tweets);
	});
}

var getSong = function() {
	spotify.search({ type: 'track', query: inputCommandName }, function(err, data) {
		if (err) {
			return console.log('Error occurred: ' + err);
		}
		console.log(data); 
	});
}

var getMovie = function() {
	request('http://www.omdbapi.com/?t=big&apikey='+omdbKey, function (error, response, body) {
  			console.log('error:', error); // Print the error if one occurred
  			console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  			console.log('body:', body); // Print the HTML for the Google homepage.
  		});
}

var doTask = function() {

}


//determines which task to complete based on user input
switch(inputCommand) {

	case "my-tweets":
		getTweets();
		break

	case "spotify-this-song":
		getSong();
		break

	case "movie-this":
		getMovie();
		break

	case "do-what-it-says":
		doTask();
		break

	default:
		console.log("please enter a valid command");
		break
}

