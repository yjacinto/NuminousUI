'use strict';
angular.module('numinousUiApp')
  .controller('ProfileCtrl', function ($scope, $http, $state) {
    var init = function () {

    $scope.joinedDate = "user.joinedDate";
    $scope.lastOnline = 'user.lastOnline';
    $scope.numberOfFriends = 'user.numberOfFriends';
    $scope.numberOfTrips = 'user.numberOfTrips';
    $scope.about = "user.about";
        
    $scope.about = '';
    $scope.profileimage = 'user.image';
        
    };

    
    $scope.isEditVisible = true;
    
    $scope.getUserProfile = function() {
        var command = encodeURI('http://localhost:1337/userprofile/getUserProfile')
        $http.get(command)
            .success(function(response) {
            $scope.about = response.bio;
            console.log(response.bio);
            
        })
            .error(function(response) {
            console.log("Error notification");
        });
    };
    
    $scope.getUserProfile();
    
    $scope.save = function(about) {
        
        var command = encodeURI('http://localhost:1337/userprofile/editprofile')
        $http.post(command, {about: about})
            .success(function(response) {
            
        })
            .error(function(response) {
            console.log("Error notification");
        });
    };
    
    
    $scope.friendrequest = function() {
        
    };
    
    $scope.message = function() {
        
    };
    
  
    init();
  });