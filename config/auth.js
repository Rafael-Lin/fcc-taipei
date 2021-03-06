'use strict';

module.exports = {
	'githubAuth': {
		'clientID': process.env.GITHUB_KEY,
		'clientSecret': process.env.GITHUB_SECRET,
		'callbackURL': process.env.GITHUB_APP_URL + 'auth/github/callback',

	},

	'facebookAuth': {
		'clientID': process.env.FACEBOOK_ID,
		'clientSecret': process.env.FACEBOOK_SECRET,
		'callbackURL': process.env.FACEBOOK_APP_URL + 'auth/facebook/callback',
	},

	'twitterAuth': {
		'consumerKey'    : process.env.TWITTER_ID,
		'consumerSecret' : process.env.TWITTER_SECRET,
		'callbackURL'    : process.env.TWITTER_APP_URL + 'auth/twitter/callback',
	}
    //https://apps.twitter.com/app/9314258
};
