'use strict';

var express = require('express');
var routes = require('./routes/index.js');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');

var app = express();

//This line accounts for the C9.io dev environment's usage of the process.env.PORT variable to run apps.
//when not running on c9, it will default to port 3000
//
require('dotenv').load();
require('./config/passport')(passport);
app.set('port', process.env.PORT || 3000);

mongoose.connect('mongodb://localhost:27017/fcc-taipei');
var db = mongoose.connection;

app.use('/public', express.static(process.cwd() + '/public'));
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

