'use strict';

angular.module('numinousUiApp')
  .controller('LoginCtrl', function ($scope, $http, authService) {
    // Put the authService on $scope to access
    // the login method in the view
    $scope.authService = authService;

    var init = function () {
      $scope.promise = $scope.getIds();
      $scope.userIds = [];
    };
    $scope.getIds = function () {
      $http.get('http://localhost:1337/user/getAllUsers').then(function(data) {
        console.log(data);
      });
    };
    init();
    console.log('hello');
});
