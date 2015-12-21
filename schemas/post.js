var mongoose = require('mongoose');

var Post = module.exports = new mongoose.Schema({
    title: {
          type: String,  //fairly self explanatory
          required: true //makes this field required for the document to be valid
    },
    body: {
          type: String,
          required: true //as before
    },
    author: {
          type: String,
          required: true
    },
    date: {
          type: Date,
          default: Date.now
    },
    likes: {
          type: Number,
          default: 0
    },
    unlikes: {
          type: Number,
          default: 0
    }
});

