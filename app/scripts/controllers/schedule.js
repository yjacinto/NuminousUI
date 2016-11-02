'use strict';

var myApp = angular.module('numinousUiApp')
  .controller('ScheduleCtrl', function($scope, $http){

    var init = function () {

      //Declaring Signup Form variables
      $scope.originCity = '';
      $scope.destinationCity = '';
      $scope.startDate = '';
      $scope.endDate = '';
      $scope.trips = '';
    };

    $scope.createTrip = function (originCity, destinationCity, startDate, endDate) {
      //change to post
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

    var getTrips = function (){

      var command = encodeURI('http://localhost:1337/trip/index');
      $http.get(command)
        .then(function(res){
          $scope.trips = res.data;
        });
    };

    getTrips();

  })

