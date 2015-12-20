var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    userName: {
          type: String,  //fairly self explanatory
          required: true //makes this field required for the document to be valid
    },
    email: {
          type: String,
          required: true, //as before
          match:  /.+@.+\..+/,  
          lowercase: true  //forces the string to all lowercase
    },
    admin: {
          type: Boolean,
          default: false  //defaults the value to 0 on creation
    }
});

