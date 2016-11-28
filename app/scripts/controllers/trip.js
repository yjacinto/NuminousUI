'use strict';

var myApp = angular.module('numinousUiApp')
  .controller('TripCtrl', function($scope, $http, API_ENDPOINT){

    $scope.friends = '';/*
    var init = function () {
      //Declaring Signup Form variables
      $scope.originCity = '';
      $scope.destinationCity = '';
      $scope.startDate = '';
      $scope.endDate = '';
      $scope.trips = '';
    };*/

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
        })
        .error(function (response) {
          console.log("Error notification");
        });
      getTrips();
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

    var getTrips = function (){
      var command = encodeURI(API_ENDPOINT.url + '/user/getUserTrips');
      $http.post(command)
        .then(function(res){
          console.log(res.data[0].trips);
          $scope.trips = res.data[0].trips;
        });
    };

    var getFriends = function(){
      $http.get(API_ENDPOINT.url + '/user/getFriends')
        .then(function (result) {
          if (result.status) {
            console.log(result.data);
            $scope.friends = result.data;
          } else {
            reject(result.data.msg);
          }
      });
    };
    getTrips();
    getFriends();

  });

