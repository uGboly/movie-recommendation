var mongoose = require('mongoose');

// create a schema
var userSchema = new mongoose.Schema({
    login_name: String,
    password: String
});

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;
