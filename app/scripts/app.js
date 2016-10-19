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
    'ngResource',
    'ui.router',
    'ngSanitize',
    'ngTouch',
    '720kb.datepicker',
    'ui.calendar'
  ])

  .config(function ($stateProvider, $urlRouterProvider) {
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
      templateUrl:'/views/schedule.html'
    };
    var calendarState = {
      name: 'calendar',
      url: '/calendar',
      templateUrl:'/views/calendar.html',
      controller: 'calendarCtrl',
      controlleras: 'calendar'    

    };

    $stateProvider.state(dashboardState);
    $stateProvider.state(loginState);
    $stateProvider.state(signState);
    $stateProvider.state(aboutState);
    $stateProvider.state(scheduleState);
    $stateProvider.state(calendarState);

  });

/*angular.module('app', [
    '720kb.datepicker'
]);*/
