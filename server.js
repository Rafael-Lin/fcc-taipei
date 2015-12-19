'use strict';

var express = require('express'),
    http = require('http'),
    routes = require('./app/routes/index.js'),
    mongo = require('mongodb');

var app = express();
app.set('port', process.env.PORT || 3000);

mongo.connect('mongodb://localhost:27017/fcc-taipei', function(err, db){
    
    if (err) {
        throw new Error('Database failed to connect!');
    } else {
        console.log('MongoDB successfully connected on port 27017');
    }

    //makes /public a shortcut to the public directory
    app.use('/public', express.static(process.cwd() + '/public'));
    app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
    
    routes(app, db);

    http.createServer(app).listen(app.get('port'), function() {
        console.log('Listening on port ' + app.get('port'));
    });
    
});