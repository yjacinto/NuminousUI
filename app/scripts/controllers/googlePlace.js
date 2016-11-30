'use strict';

angular.module('numinousUiApp')
  .controller('googlePlaceCtrl', function ($scope) {
    var init = function () {

      $scope.name = '';
      $scope.location = '';
      $scope.place_id = '';
      $scope.start = '';
      $scope.end = '';

      $scope.picker3 = '';
      $scope.picker2 = '';
      //still needed
      $scope.trip = '';
      $scope.user = '';

      //optional
      $scope.expected = '';

    };

    var that = this;

    // date and time picker
    this.picker3 = {
      date: new Date()
    };

    this.picker2 = {
      date: new Date()
    };

    this.openCalendar = function (e, picker) {
      that[picker].open = true;
    };


    $scope.addMe = function () {
      $scope.name = document.getElementById('iw-name').textContent;
      $scope.location = document.getElementById('iw-address').textContent;
      $scope.place_id = document.getElementById('iw-place-id').textContent;
      $scope.start = document.getElementById('start').value;
      $scope.end = document.getElementById('end').value;


      console.log($scope.start);
      console.log($scope.name);
      console.log($scope.location);
      console.log($scope.place_id);
    };

    init();
  });

