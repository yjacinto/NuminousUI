'use strict';


angular.module('numinousUiApp')

  .controller('LoginCtrl', function($scope, AuthService, $state) {

    $scope.user = {
      email: '',
      password: ''
    };

    $scope.login = function() {
      console.log($scope.user);
      AuthService.login($scope.user).then(function(msg) {
        $state.go('dashboard');
      }, function(err) {
        console.log(err);
        console.log('Login failed');
      });
    };
  })

  .controller('RegisterCtrl', function($scope, AuthService, $state) {
    $scope.user = {
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
        $scope.email = result.data.msg;
        console.log(result);
      });
    };

    $scope.logout = function() {
      AuthService.logout();
      $state.go('login');
    };
  })

  .controller('AppCtrl', function($scope, $state, AuthService, AUTH_EVENTS) {
    $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
      AuthService.logout();
      $state.go('login');
      console.log('session lost');
    });
  });
