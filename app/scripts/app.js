'use strict';

angular.module('numinousUiApp', [
    'ngAnimate',
    'ngCookies',
    'ngRoute',
    'ngResource',
    'ui.router',
    'ngSanitize',
    'ngTouch',
    '720kb.datepicker',
    'uiRouterStyles',
    'auth0.lock',
    'angular-jwt',
    'ui.calendar',
    'ui.bootstrap',
    'jtt_openweathermap',
    'ui.bootstrap.datetimepicker'
  ])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/');

    var homeState={
      name: 'home',
      url:'/',
      templateUrl:'/views/home.html',
      controller: 'HomeCtrl',
      controllerAs: 'home'
    }

    var loginState = {
      name:'login',
      url:'/login',
      templateUrl:'/views/login.html',
      controller:'LoginCtrl',
      controllerAs:'login'
    };

    var signState = {
      name: 'signup',
      url: '/signup',
      templateUrl: '/views/signup.html',
      controller: 'RegisterCtrl',
      controllerAs: 'signup'
    };

    var friendState = {
      name: 'friend',
      url: '/friend',
      templateUrl: '/views/friends.html',
      controller: 'FriendCtrl',
      controllerAs: 'friend'
    };

    var dashboardState = {
      name: 'dashboard',
      url: '/dashboard',
      templateUrl:'/views/dashboard.html',
      controller: 'DashboardCtrl',
      controllerAs: 'dashboard',
    };

    var createTripState = {
      name: 'createTrip',
      url: '/createTrip',
      controller:'TripCtrl',
      controllerAs:'Trip',
      templateUrl:'/views/createTrip.html',
      data:{
        css:'/styles/createTrip.css'
      }
    };

    var listTripState = {
      name: 'listTrip',
      url: '/listTrip',
      controller:'TripCtrl',
      controllerAs:'trip',
      templateUrl:'/views/listTrip.html',
      data:{
        css:'/styles/createTrip.css'
      }
    };

    var calendarState = {
      name: 'calendar',
      url: '/calendar',
      templateUrl:'/views/calendar.html',
      controller: 'calendarCtrl',
      controllerAs: 'calendar',
      params: {trip_id : null}
    };

    var createEventState = {
      name: 'calendar.event',
      url: '/addEvent',
      controller: 'calendarCtrl',
      controllerAs:'event',
      templateUrl:'/views/event.html',
      params: {trip_id : null}
    };

    var createTravelCompanion = {
      name: 'calendar.companion',
      url: '/addCompanion',
      controller: 'CompanionCtrl',
      controllerAs:'companion',
      templateUrl:'/views/companion.html',
      params: {trip_id : null}
    };

    var chatboxState = {
      name: 'chatbox',
      url: '/chat',
      controller: 'ChatCtrl',
      templateUrl:'/views/chatbox.html',
      params: {trip_id : null}
    };

    var googlePlaceState = {
      name: 'googlePlace',
      url: '/googlePlace',
      templateUrl:'/views/googlePlace.html',
      controller: 'googlePlaceCtrl',
      controllerAs: 'googlePlace',
      params: {trip_id : null}
    };

    var googleDrawState = {
      name: 'googleDraw',
      url: '/googleDraw',
      templateUrl:'/views/googleDraw.html'
    };

    var directionsState = {
      name: 'directions',
      url: '/directions',
      templateUrl:'/views/directions.html'
    };
    var profileState = {
        name: 'profile',
        url: '/profile',
        controller: 'ProfileCtrl',
        templateUrl:'/views/profile.html'
    };
    var editprofileState = {
        name: 'editprofile',
        url: '/editprofile',
        controller: 'ProfileCtrl',
        templateUrl:'/views/editprofile.html'
    };

    $stateProvider.state(dashboardState);
    $stateProvider.state(loginState);
    $stateProvider.state(signState);
    $stateProvider.state(createTripState);
    $stateProvider.state(googlePlaceState);
    $stateProvider.state(calendarState);
    $stateProvider.state(googleDrawState);
    $stateProvider.state(homeState);
    $stateProvider.state(directionsState);
    $stateProvider.state(friendState);
    $stateProvider.state(createEventState);
    $stateProvider.state(profileState);
    $stateProvider.state(editprofileState);
    $stateProvider.state(createTravelCompanion);
    $stateProvider.state(chatboxState);
    $stateProvider.state(listTripState);


    //$locationProvider.html5Mode(true);
  })

  .run(function ($rootScope, $state, AuthService, AUTH_EVENTS) {
    $rootScope.$on('$stateChangeStart', function (event, next, nextParams, fromState) {
      if (!AuthService.isAuthenticated()) {
        console.log(next.name);
        if (next.name !== 'login' && next.name !== 'signup' && next.name !== 'home') {
          event.preventDefault();
          $state.go('login');
        }
      }
    });
  })

  .filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    };
  });



