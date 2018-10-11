require("dotenv").config();

var keys = require('./keys');
var Spotify = require('node-spotify-api');
//added to format table 
var cTable = require('console.table');
var request = require('request');
var moment = require('moment');
var fs = require("fs");



var spotify = new Spotify({
	id: keys.spotify.id,
	secret: keys.spotify.secret
});

var action = process.argv[2];

//Bands in Town Artist Events search start from here
if (action === 'concert-this') {
	var artist = process.argv.slice(3).join(" ");
	console.log(artist);
	fs.appendFile("log.txt", "\n Artist:" + artist, function (err) {
		if (err) {
			console.log(err);
		}
	})
	var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

	request(queryURL, function (error, response, body) {
		if (error) {
			console.log(error);
		}
		else {
			var result = JSON.parse(body)[0];
			console.log("Venue name: " + result.venue.name);
			console.log("Venue location: " + result.venue.city);
			console.log("Date of Event: " + moment(result.datetime).format("MM/DD/YYYY"));
		}
		// appends the result to log.txt file
		fs.appendFile("log.txt", "\n Venue name: " + result.venue.name, function (err) {
			if (err) {
				console.log(err);
			}
			console.log("Band added!")
			console.log("--------------------- --------------------- --------------------- --------------------- --------------------- ---------------------");
		});
		fs.appendFile("log.txt", "\n Venue location: " + result.venue.city, function (err) {
			if (err) {
				console.log(err);
			}
		});
		fs.appendFile("log.txt", "\n Date of Event: " + moment(result.datetime).format("MM/DD/YYYY"), function (err) {
			if (err) {
				console.log(err);
			}
		});

	});

	// spotify-this-song start from here

} else if (action === 'spotify-this-song') {

	var songName = process.argv.slice(3).join(" ");

	if (songName < 4) {
		title = 'The+Sign+Ace';
		spotify.search({ type: 'track', query: title }, function (err, data) {
			console.log('* Artist: ' + data.tracks.items[0].album.artists[0].name);
			console.log('* Song: ' + data.tracks.items[0].name);
			console.log('* Preview Link: ' + data.tracks.items[0].preview_url);
			console.log('* Album: ' + data.tracks.items[0].album.name);
		})
	}
	else {

		spotify.search({ type: 'track', query: songName, limit: 10 }, function (err, data) {
			if (err) {
				return console.log('Error occurred: ' + err);
			}

			var tableArray = [];

			for (var i = 0; i < data.tracks.items.length; i++) {
				var result = {
					artist: data.tracks.items[i].album.artists[0].name,
					album_name: data.tracks.items[i].album.name,
					song_name: data.tracks.items[i].name,
					preview_url: data.tracks.items[i].preview_url
				}
				tableArray.push(result);
			}


			var table = cTable.getTable(tableArray);

			console.log(table);
			fs.appendFile("log.txt", "\n Spotify", function (err) {
				if (err) {
					console.log(err);
				}
				console.log("Spotify Added");
			})
			fs.appendFile("log.txt", "\n" + table, function (err) {
				if (err) {
					console.log(err);
				}
			})

		});
	}

	// Movie This Start from here

} else if (action === 'movie-this') {
	var movieName = process.argv.slice(3).join(" ");

	if (movieName < 4) {
		console.log('* If you haven\'t watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/');
		console.log('* It\'s on Netflix!');
	}
	else {
		var title = process.argv.slice(3).join(" ");
		request('http://www.omdbapi.com/?i=tt3896198&apikey=55e8eecb&t=' + title, function (error, response, body) {

			var result = JSON.parse(body);
			console.log("Title :" + result.Title);
			console.log("Year :" + result.Released);
			console.log("IMDB Rating :" + result.imdbRating);
			console.log("Rotten Tomatoes :" + result.Ratings[1].Value);
			console.log("Country :" + result.Country);
			console.log("Language :" + result.Language);
			console.log("Movie Plot :" + result.Plot);
			console.log("Actors :" + result.Actors);

			fs.appendFile("log.txt", "\n --------------------- --------------------- --------------------- --------------------- --------------------- ---------------------", function (err) {
				if (err) {
					console.log(err);
				}

			});

			fs.appendFile("log.txt", "\n* Title :" + result.Title, function (err) {
				if (err) {
					console.log(err);
				}
				else {
					console.log("added!");
				}
			});
			fs.appendFile("log.txt", "\n* Year :" + result.Released, function (err) {
				if (err) {
					console.log(err);
				}
			});
			fs.appendFile("log.txt", "\n* IMDB Rating :" + result.imdbRating, function (err) {
				if (err) {
					console.log(err);
				}

			});
			fs.appendFile("log.txt", "\n* Rotten Tomatoes :" + result.Ratings[1].Value, function (err) {
				if (err) {
					console.log(err);
				}

			});
			fs.appendFile("log.txt", "\n* Country :" + result.Country, function (err) {
				if (err) {
					console.log(err);
				}

			});
			fs.appendFile("log.txt", "\n* Language :" + result.Language, function (err) {
				if (err) {
					console.log(err);
				}

			})
			fs.appendFile("log.txt", "\n* Movie Plot :" + result.Plot, function (err) {
				if (err) {
					console.log(err);
				}

			});
			fs.appendFile("log.txt", "\n* Actors :" + result.Actors, function (err) {
				if (err) {
					console.log(err);
				}

			});
			fs.appendFile("log.txt", "\n --------------------- --------------------- --------------------- --------------------- ---------------------", function (err) {
				if (err) {
					console.log(err);
				}

			});


			console.log("--------------------- --------------------- --------------------- --------------------- ---------------------");
			console.log("\r\n\r");

		});

	}
}

else if (action === 'do-what-it-says') {

	fs.readFile("random.txt", "utf8", function (error, data) {
		if (error) {
			console.log(error);
		}
		else {
			var dataArr = data.split(",");
			var randomSongQuo = dataArr[1];

			spotify.search({ type: 'track', query: randomSongQuo }, function (err, data) {
				if (err) {
					return console.log(err);
				}
				console.log('* Artist: ' + data.tracks.items[0].album.artists[0].name);
				console.log('* Song: ' + data.tracks.items[0].name);
				console.log('* Preview Link: ' + data.tracks.items[0].preview_url);
				console.log('* Album: ' + data.tracks.items[0].album.name);

			})
		}
	});
}