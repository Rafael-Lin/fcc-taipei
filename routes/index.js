'use strict';

var Post = require('../schemas/post');
var InputHandler = require(process.cwd() + '/controllers/inputhandler.server.js');

module.exports = function(app, db, passport ) {

    var inputHandler = new InputHandler(db)
    var path = process.cwd();

    app.route('/').get(function(req, res) {
        res.sendFile(process.cwd() + '/public/views/index.html');

    });
    // route to test if the user is logged in or not 
    app.get('/loggedin', function(req, res) { 
        res.send(req.isAuthenticated() ? req.user : '0'); 
    }); 

    app.route('/login')
        .get(function (req, res) {
            console.log( "login function") ; 
            console.log( path ) ; 
            res.sendFile(path + '/public/views/login.html');
        });  
    app.route('/logout')
        .get(function (req, res) {
            req.logout();
            res.redirect('/');
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

    app.route('/api/user/:id')
        .get(isLoggedIn, function (req, res) {
            res.json(req.user.github);
        });


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
