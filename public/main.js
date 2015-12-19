var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function($routeProvider) {
  $routeProvider.when('/', {
  	controller: 'MainCtrl',
  	templateUrl: '/public/views/post.html'
  })
  .when('/edit/:id', {
  	controller: 'MainCtrl',
  	templateUrl: '/public/views/edit.html'
  })
  .otherwise({
  	redirectTo: '/'
  });
});


