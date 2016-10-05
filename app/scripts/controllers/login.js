'use strict';

angular.module('numinousUiApp')
   .controller('LoginCtrl', function ($scope, $http) {

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
