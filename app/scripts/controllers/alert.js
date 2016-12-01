'use strict';

/* services.js */

// don't forget to declare this service module as a dependency in your main app constructor!
angular.module('numinousUiApp')

  .factory('alertService', function($rootScope) {
    var alertService = {};

  // create an array of alerts available globally
    $rootScope.alerts = [];

    alertService.add = function(type, msg) {
    $rootScope.alerts.push({'type': type, 'msg': msg});
  };

  alertService.closeAlert = function(index) {
    $rootScope.alerts.splice(index, 1);
  };

  return alertService;
  });

function RootCtrl($rootScope, $location, alertService) {
  $rootScope.changeView = function(view) {
    $location.path(view);
  }

  // root binding for alertService
  $rootScope.closeAlert = alertService.closeAlert;
}
RootCtrl.$inject = ['$scope', '$location', 'alertService'];


