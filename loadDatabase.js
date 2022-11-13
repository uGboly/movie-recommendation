const {parse} = require('csv-parse');
var fs = require("fs");
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost:27017/movie');
var Movie = require('./schema/movie.js');

const parser = parse({
    delimiter: '\t',
    columns: true,
    skip_records_with_empty_values: true,
    skip_records_with_error: true,
    to: 100000
});


var readableStreamEvent = fs.createReadStream("./title.basics.tsv");

readableStreamEvent.on('data', function (chunkBuffer) { // Could be called multiple times 
    parser.write(chunkBuffer);
});
  
readableStreamEvent.on('end', function() { 
    // Called after all chunks read 
    console.log('got all the data'); 
});
  
readableStreamEvent.on('error', function (err) { 
console.error('got error', err);
});

parser.on('readable', function(){
    let record;
    while ((record = parser.read()) !== null) {
        Movie.create({
            tconst : record.tconst,  //alphanumeric unique identifier of the title
            titleType : record.titleType, //the type/format of the title (e.g. movie, short, tvseries, tvepisode, video, etc)
            primaryTitle : record.primaryTitle, // the more popular title / the title used by the filmmakers on promotional materials at the point of release
            originalTitle : record.originalTitle, // original title, in the original language
            isAdult : record.isAdult !== '0', // 0: non-adult title; 1: adult title
            startYear : record.startYear, // represents the release year of a title. In the case of TV Series, it is the series start year
            endYear : record.endYear, // TV Series end year. ‘\N’ for all other title types
            runtimeMinutes : record.runtimeMinutes, // primary runtime of the title, in minutes
            genres :  record.genres.split(',')//includes up to three genres associated with the title
        })
        .then((movieObj => movieObj.save()));
    }
});
// Catch any error
parser.on('error', function(err){
    console.error(err.message);
});




// var removePromises = [User.deleteMany({}), Movie.deleteMany({})];


// Promise.all(removePromises).then(function () {

//     // Load the users into the User. Mongo assigns ids to objects so we record
//     // the assigned '_id' back into the cs142model.userListModels so we have it
//     // later in the script.

//     var userModels = cs142models.userListModel();
//     var mapFakeId2RealId = {}; // Map from fake id to real Mongo _id
//     var userPromises = userModels.map(function (user) {
//         return User.create({
//             first_name: user.first_name,
//             last_name: user.last_name,
//             location: user.location,
//             description: user.description,
//             occupation: user.occupation,
//             login_name: user.last_name.toLowerCase(),
//             password: 'weak'
//         }).then(function (userObj) {
//             // Set the unique ID of the object. We use the MongoDB generated _id for now
//             // but we keep it distinct from the MongoDB ID so we can go to something
//             // prettier in the future since these show up in URLs, etc.
//             userObj.save();
//             mapFakeId2RealId[user._id] = userObj._id;
//             user.objectID = userObj._id;
//             console.log('Adding user:', user.first_name + ' ' + user.last_name, ' with ID ',
//                 user.objectID);
//         }).catch(function (err){
//             console.error('Error create user', err);
//         });
//     });


//     var allPromises = Promise.all(userPromises).then(function () {
//         // Once we've loaded all the users into the User collection we add all the photos. Note
//         // that the user_id of the photo is the MongoDB assigned id in the User object.
//         var photoModels = [];
//         var userIDs = Object.keys(mapFakeId2RealId);
//         for (var i = 0; i < userIDs.length; i++) {
//             photoModels = photoModels.concat(cs142models.photoOfUserModel(userIDs[i]));
//         }
//         var photoPromises = photoModels.map(function (photo) {
//             return Photo.create({
//                 file_name: photo.file_name,
//                 date_time: photo.date_time,
//                 user_id: mapFakeId2RealId[photo.user_id]
//             }).then(function (photoObj) {
//                 photo.objectID = photoObj._id;
//                 if (photo.comments) {
//                     photo.comments.forEach(function (comment) {
//                         photoObj.comments = photoObj.comments.concat([{
//                             comment: comment.comment,
//                             date_time: comment.date_time,
//                             user_id: comment.user.objectID
//                         }]);
//                         console.log("Adding comment of length %d by user %s to photo %s",
//                             comment.comment.length,
//                             comment.user.objectID,
//                             photo.file_name);
//                     });
//                 }
//                 photoObj.save();
//                 console.log('Adding photo:', photo.file_name, ' of user ID ', photoObj.user_id);
//             }).catch(function (err){
//                 console.error('Error create user', err);
//             });
//         });
//         return Promise.all(photoPromises).then(function () {
//             // Create the SchemaInfo object
//             return SchemaInfo.create({
//                 version: versionString
//             }).then(function (schemaInfo) {
//                 console.log('SchemaInfo object ', schemaInfo, ' created with version ', versionString);
//             }).catch(function (err){
//                 console.error('Error create schemaInfo', err);
//             });
//         });
//     });

//     allPromises.then(function () {
//         mongoose.disconnect();
//     });

// }).catch(function(err){
//     console.error('Error create schemaInfo', err);
// });