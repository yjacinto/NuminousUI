'use strict';

/**
 * @ngdoc overview
 * @name numinousUiApp
 * @description
 * # numinousUiApp
 *
 * Main module of the application.
 */
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
  'ui.calendar'
])
  .config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    var homeState = {
      name:'home',
      url:'/home',
      templateUrl:'/views/home.html',
      controller: 'HomeCtrl',
      controllerAs: 'home',
      data: {
        css:'/assets/css/main.css'
      }
    };

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
      controllerAs: 'signup',
      data: {
        css: '/assets/css/main.css'
      }
    };

    var dashboardState = {
      name: 'dashboard',
      url: '/dashboard',
      templateUrl:'/views/dashboard.html'
    };

    var scheduleState = {
      name: 'schedule',
      url: '/schedule',
      controller:'ScheduleCtrl',
      controllerAs:'schedule',
      templateUrl:'/views/schedule.html',
      data:{
        css:'/styles/schedule.css'
      }
    };

    var calendarState = {
      name: 'calendar',
      url: '/calendar',
      templateUrl:'/views/calendar.html',
      controller: 'calendarCtrl',
      controllerAs: 'calendar'
    };

    var googlemapState = {
      name: 'googlemap',
      url: '/googlemap',
      templateUrl:'/views/googlemap.html'

    };
    var placeState = {
      name: 'place',
      url: '/place',
      templateUrl:'/views/place.html'

    };
    var tempState = {
      name: 'temp',
      url: '/temp',
      templateUrl:'/views/temp.html'

    };
    var aboutState = {
      name: 'about',
      url: '/about',
      templateUrl:'/views/about.html'

    };


    $stateProvider.state(dashboardState);
    $stateProvider.state(loginState);
    $stateProvider.state(signState);
    $stateProvider.state(scheduleState);
    $stateProvider.state(googlemapState);
    $stateProvider.state(placeState);
    $stateProvider.state(calendarState);
    $stateProvider.state(tempState);
    $stateProvider.state(aboutState);
    $stateProvider.state(homeState);
  })

  .run(function ($rootScope, $state, AuthService, AUTH_EVENTS) {
    $rootScope.$on('$stateChangeStart', function (event,next, nextParams, fromState) {
      if (!AuthService.isAuthenticated()) {
        console.log(next.name);
        if (next.name !== 'login' && next.name !== 'signup') {
          event.preventDefault();
          $state.go('login');
        }
      }
    });
  });
