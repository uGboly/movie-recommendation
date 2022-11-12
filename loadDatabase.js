var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost:27017/movie');
var User = require('./schema/user.js');
var Movie = require('./schema/movie.js');

