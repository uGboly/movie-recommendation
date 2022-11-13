var mongoose = require('mongoose');

// create a schema
var movieSchema = new mongoose.Schema({
    tconst : String,  //alphanumeric unique identifier of the title
    // averageRating : Number, //weighted average of all the individual user ratings
    // numVotes  :Number, //number of votes the title has received
    titleType : String , //the type/format of the title (e.g. movie, short, tvseries, tvepisode, video, etc)
    primaryTitle : String, // the more popular title / the title used by the filmmakers on promotional materials at the point of release
    originalTitle : String, // original title, in the original language
    isAdult : Boolean, // 0: non-adult title; 1: adult title
    startYear : String, // represents the release year of a title. In the case of TV Series, it is the series start year
    endYear : String, // TV Series end year. ‘\N’ for all other title types
    runtimeMinutes : String, // primary runtime of the title, in minutes
    genres : [String] //includes up to three genres associated with the title
});

// the schema is useless so far
// we need to create a model using it
var Movie = mongoose.model('Movie', movieSchema);

// make this available to our users in our Node applications
module.exports = Movie;
