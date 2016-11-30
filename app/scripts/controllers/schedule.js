'use strict';

var myApp = angular.module('numinousUiApp')
  .controller('ScheduleCtrl', function($scope, $http){

    var init = function () {

      //Declaring Signup Form variables
      $scope.originCity = '';
      $scope.destinationCity = '';
      $scope.startDate = '';
      $scope.endDate = '';
      $scope.trips = '';
    };

    $scope.createTrip = function (originCity, destinationCity, startDate, endDate) {
      //change to post
      var command = encodeURI('http://localhost:1337/trip/create?' +
        'originCity=' + originCity +
        '&destinationCity=' + destinationCity +
        '&startDate=' + startDate +
        '&endDate=' + endDate);
      console.log(command);

      $http.post(command)
        .success(function(response) {
          console.log(response + ": test!!");
        })
        .error(function (response) {
          console.log("Error notification");
        });
      getTrips();
    };

    $scope.remove = function(item){
      var index = $scope.trips.indexOf(item);
      $scope.trips.splice(index, 1);
      $http.delete('http://localhost:1337/trip/'+item.id)
        .success(function(response){
          console.log('deleted trip successfully.')
        });
      getTrips();

    };

    $scope.getInfo = function(){
      console.log($scope.id);
    };

    var getTrips = function (){

      var command = encodeURI('http://localhost:1337/trip/index');
      $http.get(command)
        .then(function(res){
          $scope.trips = res.data;
        });
    };

    getTrips();
  });

//    Made Remove Trip into a service to be used with Modal
//    myApp.service('RemoveService', function() {
//        var $scope = this;
//        $scope.remove = function(item){
//            var index = $scope.trips.indexOf(item);
//            $scope.trips.splice(index, 1);
//            $http.delete('http://localhost:1337/trip/'+item.id)
//            .success(function(response){
//                console.log('deleted trip successfully.')
//            });
//        getTrips();
//
//    };
//    });
//    
////    Javascript for Modal
//    myApp.controller('ModalDemoCtrl', function($uibModal, $log, $document) {
//        var $ctrl = this;
//        $ctrl.items = ['item1', 'item2', 'item3'];
//
//        $ctrl.animationsEnabled = true;
//
//        $ctrl.open = function (size, parentSelector) {
//            var parentElem = parentSelector ? 
//            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
//            var modalInstance = $uibModal.open({
//            animation: $ctrl.animationsEnabled,
//            ariaLabelledBy: 'modal-title',
//            ariaDescribedBy: 'modal-body',
//            templateUrl: 'myModalContent.html',
//            controller: 'ModalInstanceCtrl',
//            controllerAs: '$ctrl',
//            size: size,
//            appendTo: parentElem,
//            resolve: {
//                items: function () {
//                return $ctrl.items;
//                }
//            }
//        });
//
//    modalInstance.result.then(function (selectedItem) {
//      $ctrl.selected = selectedItem;
//    }, function () {
//      $log.info('Modal dismissed at: ' + new Date());
//    });
//  };
//
//  $ctrl.openComponentModal = function () {
//    var modalInstance = $uibModal.open({
//      animation: $ctrl.animationsEnabled,
//      component: 'modalComponent',
//      resolve: {
//        items: function () {
//          return $ctrl.items;
//        }
//      }
//    });
//
//    modalInstance.result.then(function (selectedItem) {
//      $ctrl.selected = selectedItem;
//    }, function () {
//      $log.info('modal-component dismissed at: ' + new Date());
//    });
//  };
//
//  $ctrl.openMultipleModals = function () {
//    $uibModal.open({
//      animation: $ctrl.animationsEnabled,
//      ariaLabelledBy: 'modal-title-bottom',
//      ariaDescribedBy: 'modal-body-bottom',
//      templateUrl: 'stackedModal.html',
//      size: 'sm',
//      controller: function($scope) {
//        $scope.name = 'bottom';  
//      }
//    });
//
//    $uibModal.open({
//      animation: $ctrl.animationsEnabled,
//      ariaLabelledBy: 'modal-title-top',
//      ariaDescribedBy: 'modal-body-top',
//      templateUrl: 'stackedModal.html',
//      size: 'sm',
//      controller: function($scope) {
//        $scope.name = 'top';  
//      }
//    });
//  };
//
//  $ctrl.toggleAnimation = function () {
//    $ctrl.animationsEnabled = !$ctrl.animationsEnabled;
//  };        
//});
//
//      // Please note that $uibModalInstance represents a modal window (instance) dependency.
//// It is not the same as the $uibModal service used above.
//
//myApp.controller('ModalInstanceCtrl', function ($uibModalInstance, items, RemoveService) {
//  var $ctrl = this;
//  $ctrl.items = items;
//  $ctrl.selected = {
//    item: $ctrl.items[0]
//  };
//
//  $ctrl.ok = function () {
//      console.log("CLicked");
//      RemoveService.remove(trip);
//    $uibModalInstance.close($ctrl.selected.item);
//  };
//
//  $ctrl.cancel = function () {
//    $uibModalInstance.dismiss('cancel');
//  };
//});
//
//// Please note that the close and dismiss bindings are from $uibModalInstance.
//
//angular.module('ui.bootstrap.demo').component('modalComponent', {
//  templateUrl: 'myModalContent.html',
//  bindings: {
//    resolve: '<',
//    close: '&',
//    dismiss: '&'
//  },
//  controller: function () {
//    var $ctrl = this;
//
//    $ctrl.$onInit = function () {
//      $ctrl.items = $ctrl.resolve.items;
//      $ctrl.selected = {
//        item: $ctrl.items[0]
//      };
//    };
//
//    $ctrl.ok = function () {
//      $ctrl.close({$value: $ctrl.selected.item});
//    };
//
//    $ctrl.cancel = function () {
//      $ctrl.dismiss({$value: 'cancel'});
//    };
//  }
//    End of Javascript for Modal

  });