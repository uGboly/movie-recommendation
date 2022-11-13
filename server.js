const express = require('express')
const app = express();
const port = 3000;
var path = require("path");
const bodyParser = require('body-parser');
const multer = require('multer'); // v1.0.5
const upload = multer(); // for parsing multipart/form-data
const session = require('express-session');

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname, "build")));
app.use(session({ secret: 'secretKey', resave: false, saveUninitialized: false }));


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/movie');
mongoose.Promise = require('bluebird');
var User = require('./schema/user.js');
var Movie = require('./schema/movie.js');

app.post('/admin/login', upload.any(), (req, res) => {
    let { login_name, password} = req.body;
    console.log(login_name + " ask to login.");


    User.find({ login_name, password : password }, function (err, user) {
        if (err || user.length === 0) {
            res.status(400).send('login_name is not a valid account');
            return;
        }

        req.session.loginUser = user[0]._id;

        let resData = {
            _id: user[0]._id,
            login_name: user[0].login_name
        };

        res.status(200).send(JSON.stringify(resData));
    });
});

app.post('/user', upload.any(), async (req, res) => {
    let { login_name, password} = req.body;
    console.log(login_name + " ask to register.");

    if (!login_name || !password) {
        res.status(400).send('login_name & password should be provided');
        return;
    }

    let duplicateUser = await User.findOne({login_name : login_name});
    if (duplicateUser) {
        res.status(400).send('Login name is used');
        return;
    }

    User.create({login_name, password}, (err) => {
        if (err) {
            res.status(400).send(JSON.stringify(err));
            return;
        }
        console.log('user created!');
        res.status(200).send('registration finished');
    });

});

app.post('/admin/logout', upload.any(), (req, res) => {
    if (!req.session.loginUser) {
        res.status(401).send('The user is not currently logged in.');
    } else {
        console.log(req.session.loginUser + "logout!");
        req.session.loginUser = '';
        res.status(200).send('The user logged out successfully!');
    }
});

app.get('/movies', async (req, res) => {
    let movies = await Movie.aggregate().sample(10);
    console.log(movies);
    res.status(200).send(JSON.stringify(movies));
});

app.post('/rating', upload.any(), async (req, res) => {
    if (!req.session.loginUser) {
        res.status(401).send('No user is not currently logged in.');
        return;
    }

    let movie = await Movie.findById(req.body.movie_id);
    let user = await User.findById(req.session.loginUser);

    for (let genre of movie.genres) {
        if (user.prefered_genres.indexOf(genre) === -1) {
            user.prefered_genres.push(genre);
        }
    }

    await user.save();
    res.status(200).send(JSON.stringify(movie));
});

app.get('/recommendation', async (req, res) => {
    if (!req.session.loginUser) {
        res.status(401).send('No user is not currently logged in.');
        return;
    }

    let {prefered_genres} = await User.findById(req.session.loginUser);

    if (prefered_genres.length === 0) {
        let movies = await Movie.aggregate().sample(10);
        console.log(movies);
        res.status(200).send(JSON.stringify(movies));
        return;
    }

    let movies = await Movie.aggregate().sample(5 * prefered_genres.length);

    movies = movies.filter(m => m.genres.some(g => prefered_genres.indexOf(g) !== -1));
    res.status(200).send(JSON.stringify(movies));
    return;

});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
})