'use strict';

var GitHubStrategy = require('passport-github').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../schemas/user');
var configAuth = require('./auth');

module.exports = function (passport) {

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete GitHub profile is serialized
//   and deserialized.
//
    var CurrentUser = {} ;
    passport.serializeUser(function (user, done) {
        console.log( " serialize ");
        console.log( user ) ;
        CurrentUser.Name = user.github.displayName ;
        CurrentUser.pic = user.github.pictureUrl ;
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use(new FacebookStrategy({
        clientID: configAuth.facebookAuth.clientID,
        clientSecret: configAuth.facebookAuth.clientSecret,
        callbackURL: configAuth.facebookAuth.callbackURL,
        profileFields : ['id', 'displayName', 'emails','photos']
    },
    function (token, refreshToken, profile, done) {
        process.nextTick(function () {
            User.findOne({ 'github.id': profile.id }, function (err, user) {
                if (err) {
                    console.log("find one error"); 
                    return done(err);
                }

                if (user) {
                    return done(null, user);
                } else {
                    var newUser = new User();
                    console.log( "facebook") ;
                    newUser.github.id          = profile.id;
                    newUser.github.username    = profile.username;
                    newUser.github.displayName = profile.displayName;
                    newUser.github.pictureUrl  = profile.photos[0].value ;
                    newUser.github.email       = profile.emails[0].value ;

                    newUser.save(function (err) {
                        if (err) {
                            throw err;
                        }

                        return done(null, newUser);
                    });
                }
            });
        });
    }));

    passport.use(new GitHubStrategy({
        clientID: configAuth.githubAuth.clientID,
        clientSecret: configAuth.githubAuth.clientSecret,
        callbackURL: configAuth.githubAuth.callbackURL
    },
    function (token, refreshToken, profile, done) {
        console.log("github");
        console.log( profile ) ;
        process.nextTick(function () {
            User.findOne({ 'github.id': profile.id }, function (err, user) {
                if (err) {
                    console.log("find one error"); 
                    return done(err);
                }

                if (user) {
                    return done(null, user);
                } else {
                    var newUser = new User();
                    newUser.github.id          = profile.id;
                    newUser.github.username    = profile.username;
                    newUser.github.displayName = profile.displayName;
                    newUser.github.pictureUrl  = profile._json.avatar_url ;
                    newUser.github.email       = "" ;// profile.emails[0].value;

                    newUser.save(function (err) {
                        if (err) {
                            throw err;
                        }

                        return done(null, newUser);
                    });
                }
            });
        });
    }));
};
