'use strict';

angular.module('numinousUiApp')
  .controller('SignCtrl', function ($scope, $http) {

    var init = function () {

      //Declaring Signup Form variables
      $scope.fname = '';
      $scope.lname = '';
      $scope.username = '';
      $scope.email = '';
      $scope.email2 = '';
      $scope.password = '';
    };

    /** Function: to check if user exists already based on email provided **/
    $scope.doesUserExist = function (email) {
      $http.get(encodeURI('http://localhost:1337/user?email=' + $scope.email))
        .success(function (response) {
          $scope.userExists = response;

          if($scope.userExists === 1) {
            console.log("User already exists");
          }
          //Adding basic confirm prompt
          if(confirm('Are you sure you want to create an account?')) {
            //Todo: pass password as a hash or store as a hash
            $scope.create($scope.fname,$scope.lname,$scope.username,$scope.email,$scope.password);
          }
        })
        .error(function (response) {
          //$scope.userNotificationsList = sharedFunctionsService.addNotification('Error', 'User check failed. User Account ');
        });
    };

    //Todo: Check that email and email2 are the same
    //Todo: Add further validation for email
    //Todo: Check for username uniqueness
    //Todo: Password minimum requirements

     //http://localhost:1337/user/create?fname=test&lname=test&username=test&email=test&password=test
     $scope.create = function (fname, lname, username, email, password) {
       var command = encodeURI('http://localhost:1337/user/create?' +
         'fname=' + fname +
         '&lname=' + lname +
         '&username=' + username +
         '&email=' + email +
         '&password=' + password);
       console.log(command);

       $http.get(command)
         .success(function (response) {
          $scope.createResult = response;
          console.log(response);
         })
         .error(function (response) {
          console.log("Error notification");
         });
     };
     init();
  });
