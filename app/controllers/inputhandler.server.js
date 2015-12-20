'use strict';

var ObjectID = require('mongodb').ObjectID;

function inputHandler (db) {
    var posts = db.collection('posts');

    var self = this;

    this.getPosts = function (req, res) {
        console.log(self);
        var projection = {};

        posts.find({}, projection).toArray( function (err, result) {
            if (err) { 
                throw err; 
            }
            res.send(result);
            console.log(result);
        });
    };

    this.getPost = function (req, res) {
        var id = new ObjectID(req.params.id);
        console.log('get one id: ' + id);
        posts.find({_id: id}).toArray( function (err, result) {
            if (err) { 
                throw err; 
            }

            res.send(result);
            console.log(result);
        });
    };

    // POST API
    this.post = function(req, res){
        console.log("posting");
        req.on('data', function(data) {
            var record = {};
            data = JSON.parse(data);
            console.log( " insert " + data);
            record.body = data.body;
            record.title = data.title;
            record.date = new Date();
            record.likes = 0 ;
            record.unlikes = 0 ;
            posts.insert(record);
        }).setEncoding("utf8");

        req.on('end', function() {
            res.writeHead(200);
            res.end();
        });
    }; 

    // PUT API
    this.editPost = function(req, res) {
        req.on('data', function(data) {
            data = JSON.parse(data);
            console.log("Updating record: " + data.id);
            var id = new ObjectID(data.id);
            console.log(id);

            if (data.body != undefined) {
                posts.update({_id : id}, { $set : { body : data.body } });        
            }

            if (data.title != undefined) {
                posts.update({_id : id}, { $set : { title : data.title } });        
            }
        }).setEncoding("utf8");

        req.on('end', function() {
            res.writeHead(200);
            res.end();
        });
    };
    this.updateUnLikes = function( req, res ) {
        req.on('data', function(data) {
            data = JSON.parse(data);
            console.log("Updating Unlikes: " + data.id);
            var id = new ObjectID(data.id);
            console.log(id);
            var likesNum = data.unlikes + 1 ;
            console.log( "unlikes " + likesNum ) ;

            if (data.unlikes != undefined) {
                posts.update({_id : id}, { $set : { unlikes: likesNum} });        
            }

        }).setEncoding("utf8");

        req.on('end', function() {
            res.writeHead(200);
            res.end();
        });
    };

    this.updateLikes = function( req, res ) {
        req.on('data', function(data) {
            data = JSON.parse(data);
            console.log("Updating likes: " + data.id);
            var id = new ObjectID(data.id);
            console.log(id);
            var likesNum = data.likes + 1 ;
            console.log( "likes " + likesNum ) ;

            if (data.likes != undefined) {
                posts.update({_id : id}, { $set : { likes: likesNum} });        
            }

        }).setEncoding("utf8");

        req.on('end', function() {
            res.writeHead(200);
            res.end();
        });
    };

    // DELETE API
    this.removePost = function(req, res) {
        console.log(typeof req.query);
        var data = req.query;
        console.log("Deleting record: " + data.id);
        var id = new ObjectID(data.id);
        posts.remove({_id: id});
        res.writeHead(200);
        res.end();
    };
}

module.exports = inputHandler;
