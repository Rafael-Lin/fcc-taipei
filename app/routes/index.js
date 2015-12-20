'use strict';

var Post = require('../schemas/post');
var InputHandler = require(process.cwd() + '/app/controllers/inputhandler.server.js');

module.exports = function(app, db, passport ) {

    var inputHandler = new InputHandler(db);
    var path = process.cwd();

    app.route('/').get(function(req, res) {
        console.log("going to index : connection on '/'");
        res.sendFile(process.cwd() + '/public/index.html');

    });
    //github
    app.route('/login')
        .get(function (req, res) {
            console.log( path ) ; 
            res.sendFile(path + '/public/login.html');
        });  

    app.route('/auth/github')
        .get(passport.authenticate('github'));

    app.route('/auth/github/callback')
        .get(passport.authenticate('github', {
            successRedirect: '/',
            failureRedirect: '/login'
        }));
    function isLoggedIn (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.redirect('/login');
        }
    }
    app.route('/profile')
        .get(isLoggedIn, function (req, res) {
            res.sendFile(path + '/public/profile.html');
        });

    app.route('/api/user/:id')
        .get(isLoggedIn, function (req, res) {
            res.json(req.user.github);
        });


    //post
    app.route('/api/posts')
        .get(inputHandler.getPosts)
        .post(inputHandler.post)
        .put(inputHandler.editPost)
        .delete(inputHandler.removePost);

    app.get('/api/edit/:id', inputHandler.getPost);           

    //update likes
    app.route('/api/post/:id')
        .put(inputHandler.updateLikes);

    app.route('/api/postUnLikes/:id')
        .put(inputHandler.updateUnLikes);

};
