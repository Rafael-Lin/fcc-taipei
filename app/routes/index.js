'use strict';

var Post = require('../schemas/post');
var InputHandler = require(process.cwd() + '/app/controllers/inputhandler.server.js');

module.exports = function(app, db) {
  
  var inputHandler = new InputHandler(db);
  
  app.route('/').get(function(req, res) {
      console.log("going to index : connection on '/'");
      res.sendFile(process.cwd() + '/public/index.html');
      
  });
  
  //refactor
  //  need one for update  status
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
