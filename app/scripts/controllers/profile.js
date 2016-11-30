'use strict';
angular.module('numinousUiApp')
  .controller('ProfileCtrl', function ($scope, $http) {
    var init = function () {
      $scope.userprofile ='';

      /*$scope.joinedDate = "user.joinedDate";
      $scope.lastOnline = 'user.lastOnline';
      $scope.numberOfFriends = 'user.numberOfFriends';
      $scope.numberOfTrips = 'user.numberOfTrips';
      $scope.about = "";
      $scope.profileimage = 'user.image';*/

    };
    $scope.isEditVisible = true;

    $scope.getUserProfile = function() {
      console.log('firing getuserprofile');
        var command = encodeURI('http://localhost:1337/userprofile/getUserProfile');
        $http.get(command)
            .success(function(response) {
            $scope.userprofile = response;
            console.log(response);
        })
            .error(function(response) {
            console.log("Error notification");
        });
    };



    $scope.save = function() {

        var command = encodeURI('http://localhost:1337/userprofile/editprofile');
        $http.post(command, {bio: $scope.userprofile.bio})
            .success(function(response) {
              $scope.userprofile.bio = response.bio;
        })
            .error(function(response) {
            console.log("Error notification");
        });
      $scope.getUserProfile();
    };


    $scope.friendrequest = function() {

    };

    $scope.message = function() {

    };

    $scope.getUserProfile();
    init();
  });
