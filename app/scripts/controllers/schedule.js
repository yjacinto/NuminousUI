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
          console.log(response + ": test!!");
        })
        .error(function (response) {
          console.log("Error notification");
        });
      getTrips();
    };

    $scope.remove = function(item){
      var index = $scope.trips.indexOf(item);
      $scope.trips.splice(index, 1);
      $http.delete('http://localhost:1337/trip/'+item.id)
        .success(function(response){
          console.log('deleted trip successfully.')
        });
      getTrips();

    };

    $scope.getInfo = function(){
      console.log($scope.id);
    };

    var getTrips = function (){

      var command = encodeURI('http://localhost:1337/trip/index');
      $http.get(command)
        .then(function(res){
          $scope.trips = res.data;
        });
    };

    getTrips();

  });

