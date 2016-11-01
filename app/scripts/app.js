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
  .config(['$httpProvider', function ($httpProvider) { //intercepts all http requests
    // Add the jwtInterceptor to the array of HTTP interceptors
    // so that JWTs are attached as Authorization headers
    $httpProvider.interceptors.push(function () {
      return {
        responseError: function (rejection) { //if the request is rejected
          if (rejection.status === 403) { // HTTP status 403 Forbidden
            window.location.href = '#/forbidden/'; //route to forbidden
          }
          return rejection;
        }
      };
    });
  }])
  .config(function ($stateProvider, $urlRouterProvider, lockProvider) {

    // Initialization for the Lock widget
    lockProvider.init({
      clientID: 'HZhipvzmjLdJLZPmLszHEILaEhVvHHlw', //do not commit this
      domain: 'numinous.auth0.com', //do not commit this
      loginUrl: '/login'
    });

    // Configuration for angular-jwt
/*    jwtOptionsProvider.config({
      tokenGetter: function() {
        return localStorage.getItem('id_token');
      },
      whiteListedDomains: ['localhost'],
      //unauthenticatedRedirectPath: '/login'
    });*/

    $urlRouterProvider.otherwise('/login');

    var loginState = {
      name:'login',
      url:'/login',
      templateUrl:'/views/login.html',
      controller:'LoginCtrl',
      controllerAs:'login'
    };

    var signState = {
      name: 'signup',
      url:'/signup',
      templateUrl:'/views/signup.html',
      controller:'SignCtrl',
      controllerAs:'signup'
    };
    var dashboardState = {
      name: 'dashboard',
      url: '/dashboard',
      templateUrl:'/views/dashboard.html'
    };
    var aboutState = {
      name: 'about',
      url: '/about',
      templateUrl:'/views/about.html'
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

    $stateProvider.state(dashboardState);
    $stateProvider.state(loginState);
    $stateProvider.state(signState);
    $stateProvider.state(aboutState);
    $stateProvider.state(scheduleState);
    $stateProvider.state(googlemapState);
    $stateProvider.state(placeState);

    $stateProvider.state(calendarState);

    $stateProvider.state(tempState);

  });

