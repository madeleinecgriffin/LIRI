//require("dotenv").config();

var keys = require('./keys')

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

//var spotify = new Spotify(keys.spotify);

console.log(keys)
var client = new Twitter(keys.twitter);




//tweet search

client.get('search/tweets', {q: 'node.js'}, function(error, tweets, response) {
   console.log(tweets);
});



//spotify search
/*
spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data); 
});*/