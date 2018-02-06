//requirements
var keys = require('./keys')
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');


//keys
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


//store user inputs
var inputCommand = process.argv[2];
var inputCommandName = process.argv[3];


//functions for each task
var getTweets = function() {
	client.get('statuses/user_timeline', {q: 'retweet_cats'}, function(error, tweets, response) {
		console.log(tweets);
		for(var i = 0; i < tweets.length; i++) {
			var tweet = tweets[i];
			console.log("Tweet Text: " + tweet.text);
		}

	});
}

var getSong = function() {
	spotify.search({ type: 'track', query: inputCommandName }, function(err, data) {
		if (err) {
			return console.log('Error occurred: ' + err);
		}

		//console.log(data);
		//var song = data.tracks.items[0];
		//console.log(song)
		for(var i = 0; i < data.tracks.items.length; i++) {
			var song = data.tracks.items[i];
			console.log("Song: " + song.name);
			console.log("Artist Name: " + song.artists[0].name);
			console.log("Preview URL: " + song.preview_url);
			console.log("Album: " + song.album.name); 
		}
	});
}

var getMovie = function() {
	request("http://www.omdbapi.com/?t=" + inputCommandName + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
  		console.log('error:', error); // Print the error if one occurred
  		console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  		console.log('body:', body); // Print the HTML for the Google homepage.
  		
  		var parseBody = JSON.parse(body);
  		console.log("Movie Title: " + parseBody.Title);
  		console.log("Year: " + parseBody.Year);
  		console.log("IMDB Rating: " + parseBody.imdbRating);
  		console.log("Rotten Tomatoes Rating: " + parseBody.Ratings[1].Value);
  		console.log("Country: " + parseBody.Country);
  		console.log("Language: " + parseBody.Language);
  		console.log("Plot: " + parseBody.Plot);
  		console.log("Starring: " + parseBody.Actors);
  	});
}

var doTask = function() {
	fs.readFile(inputCommandName, 'utf8', function(err, data) {
		if (err) throw err;
		console.log('OK: ' + inputCommandName);
		console.log(data)		
	})
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

