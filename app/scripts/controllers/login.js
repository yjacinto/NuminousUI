'use strict';

angular.module('numinousUiApp')
  .controller('LoginCtrl', function ($scope, $http) {

    $scope.create = function(email, password){
      var command = encodeURI('http://localhost:1337/login');
      console.log(command);
      $http.post(command, {email : email, password : password})
        .success(function (response) {
          console.log('successfully logged in');

        })
        .error(function (response) {
        });
    };
});
