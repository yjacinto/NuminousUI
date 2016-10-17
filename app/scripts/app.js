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
    '720kb.datepicker'
  ])
  .config(['$httpProvider', function ($httpProvider) { //intercepts all http requests
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
    var extraState = {
      name: 'extra',
      url: '/extra',
      templateUrl:'/views/extra.html'

    };

    $stateProvider.state(dashboardState);
    $stateProvider.state(loginState);
    $stateProvider.state(signState);
    $stateProvider.state(aboutState);
    $stateProvider.state(scheduleState);
    $stateProvider.state(extraState);

  });

/*angular.module('app', [
    '720kb.datepicker'
]);*/
