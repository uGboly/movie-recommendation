var mongoose = require('mongoose');

// create a schema
var movieSchema = new mongoose.Schema({
    
});

// the schema is useless so far
// we need to create a model using it
var Movie = mongoose.model('Movie', movieSchema);

// make this available to our users in our Node applications
module.exports = Movie;
