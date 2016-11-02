'use strict';

angular.module('numinousUiApp')
  .controller('SignCtrl', function ($scope, $http) {

    /*var init = function () {

      //Declaring Signup Form variables
      $scope.email = '';
      $scope.password = '';
      $scope.createResult = 1;
    };*/

    /** Function: to check if user exists already based on email provided **/
    /*$scope.doesUserExist = function (email) {
      $http.get(encodeURI('http://localhost:1337/user?email=' + $scope.email))
        .success(function (response) {
          $scope.userExists = response;

          if($scope.userExists === 1) {
            console.log("User already exists");
          }
          //Adding basic confirm prompt
          if(confirm('Are you sure you want to create an account?')) {
            //Todo: pass password as a hash or store as a hash
            $scope.create($scope.email,$scope.password);
            window.location.href = '#/login/';
          }
        })
        .error(function (response) {
          //$scope.userNotificationsList = sharedFunctionsService.addNotification('Error', 'User check failed. User Account ');
        });
    };*/

    //Todo: Check that email and email2 are the same
    //Todo: Add further validation for email
    //Todo: Check for username uniqueness
    //Todo: Password minimum requirements

     $scope.create = function (email, password) {
       var command = encodeURI('http://localhost:1337/user');
       console.log(command);

       $http.post(command,{email : email, password: password})
         .success(function(response) {

         })
         .error(function (response) {
          console.log("Error notification");
         });
     };
     init();
  });
