'use strict';

var myApp = angular.module('numinousUiApp')
  .controller('ScheduleCtrl', function($scope, $http){
    $scope.greeting = 'What up playa';

    var init = function () {

      //Declaring Signup Form variables
      $scope.originCity = '';
      $scope.destinationCity = '';
      $scope.startDate = '';
      $scope.endDate = '';
    };

    $scope.createTrip = function (originCity, destinationCity, startDate, endDate) {
      var command = encodeURI('http://localhost:1337/trip/create?' +
        'originCity=' + originCity +
        '&destinationCity=' + destinationCity +
        '&startDate=' + startDate +
        '&endDate=' + endDate);
      console.log(command);

      $http.post(command)
        .success(function(response) {
          $scope.createResult = response;
          console.log(createResult + ": test!!");
        })
        .error(function (response) {
          console.log("Error notification");
        });
    };

  })

