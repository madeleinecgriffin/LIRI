//require("dotenv").config();

var keys = require('./keys')

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


var inputCommand = process.argv[2];
var inputCommandName = process.argv[3];



switch(inputCommand) {

	case "my-tweets":

		client.get('search/tweets', {q: 'node.js'}, function(error, tweets, response) {
   			console.log(tweets);
		});
		break

	case "spotify-this-song":
		
		spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  			if (err) {
    			return console.log('Error occurred: ' + err);
  			}
			console.log(data); 
		});
		break

	case "movie-this":
		break
	case "do-what-it-says":
		break
	default:
		console.log("please enter a valid command");
		break
}

