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
    'ngTouch'
  ])

  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');

    var loginState = {
      name:'login',
      url:'/login',
      templateUrl:'/views/login.html'

    }

    var dashboardState = {
      name: 'dashboard',
      url: '/dashboard',
      templateUrl:'/views/dashboard.html'

    }
    
    var aboutState = {
      name: 'about',
      url: '/about',
      templateUrl:'/views/about.html'

    }
    
    var scheduleState = {
      name: 'schedule',
      url: '/schedule',
      templateUrl:'/views/schedule.html'
    }
    
        var extraState = {
      name: 'extra',
      url: '/extra',
      templateUrl:'/views/extra.html'

    }

    $stateProvider.state(dashboardState);
    $stateProvider.state(loginState);
    $stateProvider.state(aboutState);
    $stateProvider.state(scheduleState);
    $stateProvider.state(extraState);


  });

angular.module('app', [
    '720kb.datepicker'
]);
