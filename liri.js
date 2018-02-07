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
var count = 0;


//functions for each task
var getTweets = function() {
	client.get('statuses/user_timeline', {q: 'retweet_cats'}, function(error, tweets, response) {
		
		//prints out the text of the tweets in an account
		for(var i = 0; i < tweets.length; i++) {
			var tweet = tweets[i];
			var count = i + 1
			console.log("-------------------------")
			console.log("Tweet Number: " + count);
			console.log("Tweet Text: " + tweet.text);
		}
		console.log("-------------------------")
	});
}

var getSong = function() {
	spotify.search({ type: 'track', query: inputCommandName }, function(err, data) {
		
		if (err) {
			return console.log('Error occurred: ' + err);
		}

		//a for loop that finds top search results for a keyword in a song or album
		for(var i = 0; i < data.tracks.items.length; i++) {
			var song = data.tracks.items[i];
			var count = i + 1
			console.log("-------------------------")
			console.log("Track Number: " + count);
			console.log("Song: " + song.name);
			console.log("Artist Name: " + song.artists[0].name);
			console.log("Preview URL: " + song.preview_url);
			console.log("Album: " + song.album.name); 
		}
		console.log("-------------------------")
	});
}

var getMovie = function() {
	request("http://www.omdbapi.com/?t=" + inputCommandName + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
  		
  		console.log('error:', error);
  		console.log('statusCode:', response && response.statusCode); 
  		
  		//parses data into readable object and prints information about the movie
  		var parseBody = JSON.parse(body);
  		console.log("-------------------------")
  		console.log("Movie Title: " + parseBody.Title);
  		console.log("Year: " + parseBody.Year);
  		console.log("IMDB Rating: " + parseBody.imdbRating);
  		console.log("Rotten Tomatoes Rating: " + parseBody.Ratings[1].Value);
  		console.log("Country: " + parseBody.Country);
  		console.log("Language: " + parseBody.Language);
  		console.log("Plot: " + parseBody.Plot);
  		console.log("Starring: " + parseBody.Actors);
  		console.log("-------------------------")
  	});
}

var doTask = function() {
	fs.readFile(inputCommandName, 'utf8', function(err, data) {
		if (err) throw err;

		//splits text of file into an array and assigns those values to the new input commands and reruns the command function
		var newArr = data.split(",");
		inputCommand = newArr[0];
		inputCommandName = newArr[1];
		readInput();
	})
}



//determines which task to complete based on user input
var readInput = function() {
	
	switch(inputCommand) {

		case "my-tweets":
		getTweets();
		break

		case "spotify-this-song":
		if (inputCommandName) {
			getSong();
		}
		else {
			console.log("-------------------------")
			console.log("Please specify the keyword you would like to use to search Spotify after you request 'spotify-this-song'.");
			console.log("-------------------------")
		}
		break

		case "movie-this":
		if (inputCommandName) {
			getMovie();
		}
		else {
			console.log("-------------------------")
			console.log("Please specify the movie you would like to search for after you request 'movie-this'.");
			console.log("-------------------------")
		}
		break

		case "do-what-it-says":
		if (inputCommandName) {
			doTask();
		}
		else {
			console.log("-------------------------")
			console.log("Please specify the text file you would like to read commands from after you request 'do-what-it-says'.");
			console.log("-------------------------")
		}
		break

		default:
		console.log("-------------------------")
		console.log("Please enter a valid command.");
		console.log("-------------------------")
		break

	}
}

readInput();