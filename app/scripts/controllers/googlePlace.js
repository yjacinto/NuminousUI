'use strict';

angular.module('numinousUiApp')
  .controller('googlePlaceCtrl', function ($scope, $stateParams, $http, API_ENDPOINT) {

    var init = function () {
      $scope.name = '';
      $scope.startTime = '';
      $scope.endTime = '';
      $scope.location = '';
      $scope.place_id = '';
    };

    $scope.trip_id = $stateParams.trip_id;
    console.log('scope trip id: ' + $scope.trip_id);

    var that = this;
    $scope.picker3 = {
      date: new Date()
    };

    $scope.picker2 = {
      date: new Date()
    };

    $scope.openCalendar = function (e, picker2) {
      $scope.picker2.open = true;

    };
    $scope.openCalendar = function (e, picker3) {
      $scope.picker3.open = true;

    };

    $scope.addMe = function () {
      $scope.name = document.getElementById('iw-name').textContent;
      $scope.location = document.getElementById('iw-address').textContent;
      $scope.place_id = document.getElementById('iw-place-id').textContent;

      $scope.startTime = moment(($scope.picker2.date), 'short').format("YYYY-MM-DD HH:mm");
      $scope.endTime = moment(($scope.picker2.date), 'short').format("YYYY-MM-DD HH:mm");

      createEvent($scope.name, $scope.startTime, $scope.endTime, $scope.location, $scope.place_id);

    };

    var createEvent = function(name, startTime, endTime, location, place_id) {
      console.log('trip id in addEvent is ' + $scope.trip_id);
      var data = {
        name: name,
        startTime : startTime,
        endTime : endTime,
        location: location,
        place_id: place_id,
        trip_id : $scope.trip_id
      };
      $http.post(API_ENDPOINT.url + '/event/create', data ).then(function(result){
        if (result.status) {
          console.log(result.data);
        } else {
          reject(result.data.msg);
        }
      });
    };

    init();
  });

