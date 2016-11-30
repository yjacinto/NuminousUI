'use strict';


angular.module('numinousUiApp')
  .controller('googlePlaceCtrl', function ($scope) {
    var init = function () {

      $scope.name = '';
      $scope.location ='';
      $scope.place_id = '';

      //still needed
      $scope.trip = '';
      $scope.user = '';

      //optional
      $scope.startime = '';
      $scope.endTime = '';
      $scope.date = '';
      $scope.expected = '';


    };

    $scope.addMe = function () {
      console.log('test');
      $scope.name = document.getElementById('iw-name').textContent;
      $scope.location = document.getElementById('iw-address').textContent;
      $scope.place_id = document.getElementById('iw-place-id').textContent;
      console.log($scope.name);
      console.log($scope.location);
      console.log($scope.place_id);
    };

    init();
  });
