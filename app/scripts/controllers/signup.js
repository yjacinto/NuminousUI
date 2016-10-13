'use strict';

angular.module('numinousUiApp')
  .controller('SignCtrl', function ($scope, $http, sharedFunctionsService) {

    var init = function () {

      //Declaring Signup Form variables
      $scope.fname = '';
      $scope.lname = '';
      $scope.username = '';
      $scope.email = '';
      $scope.email2 = '';
      $scope.password = '';
    };

    //Todo: Check that email and email2 are the same
    //Todo: Add further validation for email
    //Todo: Check for username uniqueness
    //Todo: Password minimum requirements

    /** Function: to check if user exists already based on email provided **/
     $scope.doesUserExist = function (email) {
       $http.get('http://localhost:1337/user?email=' + $scope.email)
         .success(function (response) {
           $scope.userExists = response;

           if ($scope.userExists == 1) {
             var userExistsHtmlMsg = 'User with this email address already exists in our database. Click <a href="#/signup/' +
                 '"><b>here</b></a> to sign up.';
             $scope.userNotificationsList = sharedFunctionsService.addNotification('Warning', userExistsHtmlMsg, $scope.userNotificationsList);
             return;
           }

           //Adding basic confirm prompt
           if(confirm('Are you sure you want to create an account?')) {
             //Todo: pass password as a hash or store as a hash
             $scope.create($scope.fname,$scope.lname,$scope.username,$scope.email,$scope.password);
           }


         })
         .error(function (response) {
           $scope.userNotificationsList = sharedFunctionsService.addNotification('Error', 'User check failed. User Account ')

         })
     };



  });
