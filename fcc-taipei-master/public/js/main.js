  var names = ["Jason", "Tanay", "Aditya", "Allen", "Tom"];

  var myApp = angular.module('myApp', ['firebase']);
  myApp.controller('MyCtrl', function($scope, $firebaseArray){
    /*$scope.currentTime = new Date();*/
    $scope.member = {
      name: '',
      currentTime: new Date().getTime(),
      title: '',
      body: ''
    };
    
    var ref = new Firebase('https://larry-001-chatroom.firebaseio.com/');

    // create a synchronized array
    $scope.members = $firebaseArray(ref);    

    $scope.addTodo = function () {
    	var randomName = names[Math.floor(Math.random()*5)]; 
      $scope.member.currentTime = new Date().getTime();
      $scope.members.$add({
    		name: $scope.member.name = randomName,
        currentTime: $scope.member.currentTime,
        title: $scope.member.title,
        body: $scope.member.body
    	});
    	$scope.member.title = '';
      $scope.member.body = '';
    };
    
  });