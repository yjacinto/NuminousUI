/**
 * Created by Eevee on 11/6/16.
 */
'use strict';

angular.module('numinousUiApp')
  .controller('DashboardCtrl', function ($scope, $http, openweathermapFactory, AuthService,API_ENDPOINT) {

    var init = function () {
      $scope.city_name = 'San Jose, CA';
      $scope.weather_arr = [];
      $scope.createTrip='';
      getWeather();
      getInfo();
      getTrips();
    };

    var getInfo = function() {
      $http.get(API_ENDPOINT.url + '/user/getInfo').then(function(result) {
        $scope.user = result.data;
        $scope.first = result.data.first_name;
        $scope.last = result.data.last_name;
      });
    };


    var getTrips = function (){
      console.log('firing getTrips');
      var command = encodeURI(API_ENDPOINT.url + '/user/getUserTrips');
      $http.post(command)
        .then(function(res){
          console.log('res:')
          console.log(res);
          console.log('trips: ' + JSON.stringify(res.data[0]));
          //console.log('travelers: ' + res.data[0].travelers);

          $scope.createTrip = res.data.trips;
        });
    };

    $scope.updateWeather = function (city_name) {

        getWeather(city_name);
      };

      var getWeather = function(city_name){
      var command = encodeURI('http://api.openweathermap.org/data/2.5/weather?q=' + $scope.city_name +
        '&appid=d90b59f6f59e1e3a1adbb1ef857b3052&units=imperial');
        console.log(command);

      $http({
        method: 'GET',
        url: command,
        headers: {
          'Authorization' : undefined
        }
      }).then(function (response) {
          console.log(response);
        $scope.weather_arr = response.data;
        $scope.w_city = $scope.weather_arr.name;
        $scope.w_description = $scope.weather_arr.weather[0].description;
        $scope.w_icon = $scope.weather_arr.weather[0].icon;
        $scope.w_tempF = $scope.weather_arr.main.temp;
        $scope.w_id = $scope.weather_arr.weather[0].id;

      });
    };

    init();
  });
