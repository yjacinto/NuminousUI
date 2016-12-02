'use strict';


angular.module('numinousUiApp')

  .controller('LoginCtrl', function($rootScope, $scope, AuthService, $state, alertService) {

    $scope.user = {
      id:'',
      first_name: '',
      last_name: '',
      email: '',
      password: ''
    };

    $scope.login = function() {
      AuthService.login($scope.user).then(function(msg) {
        console.log('add alertService');
        alertService.add("warning", 'logged in');
        console.log($rootScope.alerts);
        $state.go('dashboard');

      }, function(err) {
        console.log('add alertService');
        console.log($rootScope.alerts);
        alertService.add("warning", err);
        console.log(err);
        console.log('Login failed');
      });
    };
  })

  .controller('RegisterCtrl', function($scope, AuthService, $state) {
    $scope.user = {
      first_name : '',
      last_name : '',
      email: '',
      password: ''
    };

    $scope.signup = function() {
      AuthService.register($scope.user).then(function(msg) {
        $state.go('login');
        console.log('Register Success!');

      }, function(errMsg) {
        console.log('register failed');
        console.log(errMsg);
      });
    };
  })

  .controller('InsideCtrl', function($scope, AuthService, API_ENDPOINT, $http, $state) {
    $scope.destroySession = function() {
      AuthService.logout();
    };

    $scope.getInfo = function() {
      $http.get(API_ENDPOINT.url + '/user/getInfo').then(function(result) {
        $scope.user = result.data;
        console.log($scope.user);
      });
    };

    $scope.getUserTrips = function(){
      $http.get(API_ENDPOINT.url + '/user/getUserTrips').then(function(result) {
        $scope.trips = result.data;
        console.log($scope.trip);
      });
    };

    $scope.logout = function() {
      AuthService.logout();
      $state.go('home');
    };
  })

  .controller('AppCtrl', function($scope, $state, AuthService, AUTH_EVENTS) {
    $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
      AuthService.logout();
      $state.go('home');
      console.log('session lost');
    });

    $scope.isAuthenticated = function(){
      return AuthService.isAuthenticated();
    };
  });
