var myApp = angular.module('myApp', ['ngRoute', 'ngResource']);

myApp.config(function($routeProvider, $locationProvider, $httpProvider ) {

    $httpProvider.interceptors.push(function($q, $location) {
      return {
        response: function(response) {
          return response;
        },
        responseError: function(response) {
          if (response.status === 401)
            $location.url('/login');
          return $q.reject(response);
        }
      };
    });

    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope ){

      var deferred = $q.defer();

      // Make an AJAX call to check if the user is logged in
      $http.get('/loggedin').success(function(user){
        // Authenticated
        if (user !== '0'){
            console.log( "authed" ) ;
            console.log( user ) ;
            // $provide.provider('username', function() { return mUsername; });
            // $provide.provider('userpicture', function() { return mUserpicture; });
            $rootScope.username = user.github.displayName ;
            $rootScope.userpicture = user.github.pictureUrl ;
            $rootScope.userMail = user.github.pictureUrl ;
            deferred.resolve();

        // Not Authenticated
        }else {
          $rootScope.username = 'You need to log in.';
          //$timeout(function(){deferred.reject();}, 0);
          deferred.reject();
          $location.url('/login');
        }
      });

      return deferred.promise;
    };

    $routeProvider.when('/', {
        controller: 'MainCtrl',
        templateUrl: '/public/views/post.html',
        resolve: {
          loggedin: checkLoggedin
        }
    })
    .when('/login', {
        templateUrl: '/public/views/login.html',
        controller: 'MainCtrl'
    })
    .when('/edit/:id', {
        controller: 'MainCtrl',
        templateUrl: '/public/views/edit.html'
    })
    .when('/profile', {
        controller: 'MainCtrl',
        templateUrl: '/public/views/profile.html'
    })
    .otherwise({
        redirectTo: '/'
    });
});

myApp.controller('MainCtrl', function($scope, $http, $location, $routeParams, $rootScope ) {

    var apiUrl = '/api/posts';
    var UpdateLikesUrl = '/api/post/';
    var UpdateUnLikesUrl = '/api/postUnLikes/';

    function getPosts() {
        $http.get(apiUrl)
            .success(function(response) {
                response.forEach(function(post) {
                    post.date = new Date(post.date);
                    post.order = post.date.getTime();
                    post.likes = post.likes ;
                    post.unlikes = post.unlikes ;
                    post.authorName = post.authorName ;
                    post.authorPicture = post.authorPic ;
                    post.authorMail = post.authorMail ;
                });
                $scope.posts = response;
                console.log( $scope.posts ) ;
            });
    }

    $scope.addPost = function () {
        $http.post(apiUrl, {
            title: $scope.member.title,
            body: $scope.member.body ,
            likes : 0 ,
            unlikes : 0 ,
            authorMail : $rootScope.userMail,
            authorName : $rootScope.username,
            authorPicture : $rootScope.userpicture,
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

    $scope.AddLikes = function ( id , likes ) {
        var tmpApiUrl = UpdateLikesUrl + id ;
        console.log( "run update likes" + tmpApiUrl ) ;
        $http.put( tmpApiUrl, { id : id , likes : likes } )
            .success(function() {
                getPosts();
            });
    };

    $scope.AddUnLikes = function ( id , unlikes ) {
        var tmpApiUrl = UpdateUnLikesUrl + id ;
        console.log( "run update likes" + tmpApiUrl ) ;
        $http.put( tmpApiUrl, { id : id , unlikes : unlikes } )
            .success(function( ) {
                getPosts();
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

    getPosts();
});
