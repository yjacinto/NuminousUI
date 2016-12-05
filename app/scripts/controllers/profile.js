'use strict';
angular.module('numinousUiApp')
  .controller('ProfileCtrl', function ($scope, $http, API_ENDPOINT) {
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
        var command = encodeURI(API_ENDPOINT.url + '/userprofile/getUserProfile');
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
      console.log($scope.bio);
      console.log('firing save');
        var command = encodeURI(API_ENDPOINT.url +'/userprofile/editprofile');
        $http.post(command, {bio: $scope.bio})
            .success(function(response) {
              console.log(response);
              $scope.bio = response.bio;
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
