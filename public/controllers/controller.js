myApp.controller('MainCtrl', function($scope, $http, $location, $routeParams) {
  
  // var apiUrl = 'https://mean-js-project-yakyu-4.c9.io/api/posts';
  var apiUrl = '/api/posts';
  
  function getPosts() {
    $http.get(apiUrl)
      .success(function(response) {
        response.forEach(function(post) {
          // post.date = new Date(post.date).toTimeString();
          post.date = new Date(post.date);
          post.order = post.date.getTime();
        });
                  
        console.log(typeof response[0].date);

        $scope.posts = response;
        // $scope.member.title = '';
        // $scope.member.body = '';
      });
  }
  
  getPosts();
    
 
  $scope.getPost = function() {
    var id = $routeParams.id;
    console.log('https://demo-project-larry0220-1.c9.io/api/edit/' + id);
    
    $http.get('https://demo-project-larry0220-1.c9.io/api/edit/' + id)
      .success(function(response) {
        $scope.member = response[0];
    });
  };
  
  $scope.addPost = function () {
    $http.post(apiUrl, { 
        title: $scope.member.title, 
        body: $scope.member.body 
      })
      .success(function() {
        getPosts();
        $scope.member.title = '';
        $scope.member.body = '';
      });
  };
  
  $scope.editPost = function () {
    var id = $routeParams.id
    $http.put(apiUrl, { 
        id: id, 
        title: $scope.member.title, 
        body: $scope.member.body 
      })
      .success(function() {
        window.location.href = '/';
      });
  };
  
  $scope.deletePost = function (id) {
    console.log(id);
    console.log(apiUrl + "?id=" + id);
    $http.delete(apiUrl + "?id=" + id)
      .success(function() {
        getPosts();
        console.log('Delete');
      });
  };
  
});
