'use strict';

var myApp = angular.module('numinousUiApp')
  .controller('TripCtrl', function($scope, $http, API_ENDPOINT, trip){


    $scope.friends = '';

    $scope.newVal = function () {
      $scope.originCity = document.getElementById('autocomplete').value;
      $scope.destinationCity = document.getElementById('autocomplete1').value;
    };

    $scope.createTrip = function (originCity, destinationCity, startDate, endDate) {
      //change to post
      var command = encodeURI(API_ENDPOINT.url + '/trip/create?' +
        'originCity=' + originCity +
        '&destinationCity=' + destinationCity +
        '&startDate=' + startDate +
        '&endDate=' + endDate);
      $http.post(command)
        .success(function(response) {
          console.log(response.data);
          $state.go('listTrip');
        })
        .error(function (response) {
          console.log("Error notification");
        });
      getTrips();
      document.getElementById('createTripForm').reset();
    };

    $scope.remove = function(item){
      var index = $scope.trips.indexOf(item);
      $scope.trips.splice(index, 1);
      $http.delete(API_ENDPOINT.url + '/trip/'+ item.id)
        .success(function(response){
          console.log('Deleted trip successfully.')
        });
      getTrips();
    };

    $scope.getInfo = function(){
      console.log($scope.id);
    };

    var getTrips = (function (){
      console.log('firing getTrips');
      var command = encodeURI(API_ENDPOINT.url + '/user/getUserTrips');
      $http.post(command)
        .then(function(res){
          console.log('trips: ' + JSON.stringify(res.data[0]));
          //console.log('travelers: ' + res.data[0].travelers);
          $scope.trips = res.data[0].trips;
        });
    });

    /*var getTrips = (function (){
      console.log('firing getTrips');
      var command = encodeURI(API_ENDPOINT.url + '/user/getUserTrips');
      $http.post(command)
        .then(function(res){
          console.log('trips: ' + JSON.stringify(res.data[0]));
          //console.log('travelers: ' + res.data[0].travelers);
          //$scope.trips = res.data[0].trips;
        });
    });*/

    var getTripsAndTravelers = (function (){
      var command = encodeURI(API_ENDPOINT.url + '/user/getUserTripsAndTravelers');
      $http.post(command)
        .then(function(res){
          //console.log('trips: ' + JSON.stringify(res.data[0]));
          //console.log('travelers: ' + res.data[0].travelers);
          $scope.trips = res.data;
          console.log(res.data);
          console.log(res.data.travelers);
        });
    });

    var getFriends = (function(){
      $http.get(API_ENDPOINT.url + '/user/getFriends')
        .then(function (result) {
          if (result.status) {
            console.log(result.data);
            $scope.friends = result.data;
          } else {
            reject(result.data.msg);
          }
      });
    });

    $scope.assignTripId = function(id){
      trip.trip_id = id;
      $http.post(API_ENDPOINT.url + '/trip/findById', {trip_id : id})
        .then(function (result) {
          if (result.status) {
            trip.destinationCity = result.data.destinationCity;
            trip.startDate = result.data.startDate;
            trip.endDate = result.data.endDate;
          } else {
            reject(result.data.msg);
          }
        });
    };

    getTripsAndTravelers();
  });

