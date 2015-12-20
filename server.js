'use strict';

var express = require('express');
var routes = require('./app/routes/index.js');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');

var app = express();
//This line accounts for the C9.io dev environment's usage of the process.env.PORT variable to run apps.
//when not running on c9, it will default to port 3000
//
require('dotenv').load();
require('./app/config/passport')(passport);
app.set('port', process.env.PORT || 3000);

mongoose.connect('mongodb://localhost:27017/fcc-taipei');
var db = mongoose.connection;


//makes /public a shortcut to the public directory
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/controllers', express.static(process.cwd() + '/app/controllers'));

app.use(session({
    secret: 'secretClementine',
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
routes(app, db, passport );

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});

