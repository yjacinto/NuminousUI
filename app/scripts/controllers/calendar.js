'use strict';

angular.module('numinousUiApp')
  .controller('calendarCtrl',
    function($scope, $compile, $timeout, uiCalendarConfig, $http, API_ENDPOINT, $stateParams) {

      $scope.trip_id = $stateParams.trip_id;
      console.log($scope.trip_id);

      var init = function () {
        $scope.events = [];
      };

      var getAllEvents = function(){
        var data = {
          trip_id : $scope.trip_id
        };
        console.log ("before post");
        $http.post(API_ENDPOINT.url + '/trip/getEventsById', data )
          .then(function(result){
            if (result.status) {
              console.log ("can you see me");

              $scope.events = result.data;
              console.log($scope.events);
            } else {
              reject(result.data.msg);
            }
          });
      };


      getAllEvents();



      var date = new Date();
      var d = date.getDate();
      var m = date.getMonth();
      var y = date.getFullYear();


      /* event source that pulls from google.com */
      $scope.eventSource = {
        url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
        className: 'gcal-event',           // an option!
        currentTimezone: 'America/California' // an option!
      };
      /* event source that contains custom events on the scope */
      $scope.events = [
        {title: 'All Day Event',start: new Date(y, m, 1)},
        {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
        {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
        {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
        {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
        {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
      ];
      /* event source that calls a function on every view switch */
      $scope.eventsF = function (start, end, timezone, callback) {
        var s = new Date(start).getTime() / 1000;
        var e = new Date(end).getTime() / 1000;
        var m = new Date(start).getMonth();
        var events = [{title: 'Feed Me ' + m,start: s + (50000),end: s + (100000),allDay: false, className: ['customFeed']}];
        callback(events);
      };

      $scope.calEventsExt = {
        color: '#f00',
        textColor: 'yellow',
        events: [
          {type:'party',title: 'Lunch',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
          {type:'party',title: 'Lunch 2',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
          {type:'party',title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
        ]
      };
      /* alert on eventClick */
      $scope.alertOnEventClick = function( date, jsEvent, view){
        $scope.alertMessage = (date.title + ' was clicked ');
      };
      /* alert on Drop */
      $scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
        $scope.alertMessage = ('Event Dropped to make dayDelta ' + delta);
      };
      /* alert on Resize */
      $scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view ){
        $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
      };
      /* add and removes an event source of choice */
      $scope.addRemoveEventSource = function(sources,source) {
        var canAdd = 0;
        angular.forEach(sources,function(value, key){
          if(sources[key] === source){
            sources.splice(key,1);
            canAdd = 1;
          }
        });
        if(canAdd === 0){
          sources.push(source);
        }
      };

      /* add custom event*/
      $scope.addEvent = function(name, startTime, endTime, location, isFullDay) {
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

        /*$scope.events.push({
         title: 'Open Sesame',
         start: new Date(y, m, 28),
         end: new Date(y, m, 29),
         className: ['openSesame']
         });*/
      };
      /* remove event */
      $scope.remove = function(index) {
        $scope.events.splice(index,1);
      };
      /* Change View */
      $scope.changeView = function(view,calendar) {
        uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
      };
      /* Change View */
      $scope.renderCalendar = function(calendar) {
        $timeout(function() {
          if(uiCalendarConfig.calendars[calendar]){
            uiCalendarConfig.calendars[calendar].fullCalendar('render');
          }
        });
      };
      /* Render Tooltip */
      $scope.eventRender = function( event, element, view ) {
        element.attr({'tooltip': event.title,
          'tooltip-append-to-body': true});
        $compile(element)($scope);
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
          eventClick: $scope.alertOnEventClick,
          eventDrop: $scope.alertOnDrop,
          eventResize: $scope.alertOnResize,
          eventRender: $scope.eventRender
        }
      };



      /* event sources array*/
      $scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventsF];
      $scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];

      init();

    });


