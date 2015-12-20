myApp.controller('MainCtrl', function($scope, $http, $location, $routeParams) {

    var apiUrl = '/api/posts';
    var UpdateLikesUrl = '/api/post/';
    var UpdateUnLikesUrl = '/api/postUnLikes/';
    $scope.username = "unknown" ;

    $scope.getPost = function() {
        // current unused
        var id = $routeParams.id;
        console.log('https://demo-project-larry0220-1.c9.io/api/edit/' + id);
        $http.get('https://demo-project-larry0220-1.c9.io/api/edit/' + id)
            .success(function(response) {
                $scope.member = response[0];
            });
    };

    function getPosts() {
        $http.get(apiUrl)
            .success(function(response) {
                response.forEach(function(post) {
                    post.date = new Date(post.date);
                    post.order = post.date.getTime();
                    post.likes = post.likes ;
                    post.unlikes = post.unlikes ;
                });
                $scope.posts = response;
            });
    }

    $scope.addPost = function () {
        $http.post(apiUrl, { 
            title: $scope.member.title, 
            body: $scope.member.body ,
            likes : 0 ,
            unlikes : 0 ,
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
