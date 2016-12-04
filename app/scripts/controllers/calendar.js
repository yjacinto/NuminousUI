'use strict';

angular.module('numinousUiApp')
  .controller('calendarCtrl',
    function($scope, $compile, $timeout, uiCalendarConfig, $http, API_ENDPOINT, $stateParams, trip) {


      $scope.trip_id = trip.trip_id;
      var isFirstTime = true;

      $scope.events = [];
      $scope.eventSources = [$scope.events];

      var getAllEvents = function(){
        var data = {
          trip_id : $scope.trip_id
        };
        $http.post(API_ENDPOINT.url + '/trip/getEventsById', data )
          .then(function(result){
            console.log("result");
            console.log(result);
            $scope.events.slice(0, $scope.events.length);
            angular.forEach(result.data.events, function (value){
              $scope.events.push({
                title: value.name,
                description: value.location,
                start: value.startTime,
                end:  value.endTime,
                allDay : value.allDay,
                stick: true
              });
            });
          });
      };

      getAllEvents();
      /* event source that calls a function on every view switch */
      $scope.eventsF = function (start, end, timezone, callback) {
        var s = new Date(start).getTime() / 1000;
        var e = new Date(end).getTime() / 1000;
        var m = new Date(start).getMonth();
        callback(events);
      };

      /* config object */
      $scope.uiConfig = {
        calendar:{
          height: 450,
          editable: true,
          header:{
            left: 'title',
            center: '',
            right: 'today prev,next'
          },
          eventClick: $scope.alertOnEventClick
        }
      };

      /* alert on eventClick */
      $scope.alertOnEventClick = function( date, jsEvent, view){
        $scope.alertMessage = (date.title + ' was clicked ');
      };

      /* Change View */
      $scope.changeView = function(view,calendar) {
        uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
      };
      /* Change View */
      $scope.renderCalender = function(calendar) {
        if(uiCalendarConfig.calendars[calendar]){
          uiCalendarConfig.calendars[calendar].fullCalendar('render');
        }
      };



      /* add custom event*/
      /*    $scope.addEvent = function(name, startTime, endTime, location, isFullDay) {
       console.log('trip id in addEvent is ' + $scope.trip_id);
       var data = {
       name: 'test',
       startTime : '12-03-2016 10:00:00 AM',
       endTime : '12-03-2016 10:00:00 PM',
       location: 'test',
       place_id: '',
       trip_id : $scope.trip_id,
       allDay: false
       };

       $http.post(API_ENDPOINT.url + '/event/create', data ).then(function(result){
       if (result.status) {
       console.log(result.data);
       } else {
       reject(result.data.msg);
       }
       });
       $scope.events.push({
       title: 'test',
       start: moment("11-29-2016", "MM-DD-YYYY").toDate(),
       end: moment("12-03-2016", "MM-DD-YYYY").toDate(),
       allDay: false
       });

       $scope.events.push({
       title: 'Open Sesame',
       start: new Date(y, m, 28),
       end: new Date(y, m, 29),
       className: ['openSesame']
       });
       };*/


    });

/*
 var getAllEvents = function(){
 var data = {
 trip_id : $scope.trip_id
 };
 $http.post(API_ENDPOINT.url + '/trip/getEventsById', data )
 .then(function(result){
 if (result.status) {
 $scope.events = result.data.events;
 console.log($scope.events);
 } else {
 reject(result.data.msg);
 }
 });
 };


 getAllEvents();*/


