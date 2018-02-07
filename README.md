# LIRI
NWCB assignment - making a basic app similar to SIRI

In this App, I use Node.js to process several different search commands that could be given by the user.

1. If a user's command is "my-tweets", the app will look up the last 20 tweets created by the dummy Twitter account @retweet_cats and print the text of the last 20 tweets.

2. If the user's command is "spotify-this-song", the app will look up the top 20 search items for this song (could be song name, album name, band name, etc.) In this case the user will need to input a second command to specify the search term they would like the app to look for.

3. If the user's command is "movie-this", the app will print a movie summary from OMDB for that movie. In this case the user will have to input a second command to specify the movie they would like to look up as well.

4. If the user's command is "do-what-it-says", the app will read a text file. The text file will contain commands relevant to the above tasks - for example, it could consists of "spotify-this-song" followed by a song name. The app will then process the command written in the text file. In this case a second input is needed to specify the text file the app should read.

If the user does not input any of these commands, the app will prompt them to do so. Additionally, the app prompts the user to input more information if not enough is given.

* **liri.js** is the file that processes these commands

* **Keys.js** holds the API keys for Twitter and Spotify

* **random.txt** holds the text commands for the "do-what-it-says" process
