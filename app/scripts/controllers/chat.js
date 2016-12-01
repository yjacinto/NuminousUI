/**
 * Created by edwin on 11/28/16.
 */

'use strict';

angular.module('numinousUiApp')
  .controller('ChatCtrl', function ($scope, $log, $http, API_ENDPOINT, $stateParams) {

    $scope.predicate = '-id';
    $scope.reverse = false;
    $scope.chatList = [];
    $scope.trip_id = $stateParams.trip_id;

    console.log($scope.trip_id);

    $scope.getAllChat= function() {
      //establish socket connection
      console.log('inside getAllChat');
      io.socket.post(API_ENDPOINT.url + '/chatroom/addUserToChat',{
        trip_id : $scope.trip_id
      },function (success_data, jwRes) {
          $scope.chatList = success_data;
          $log.info(success_data);
        });
    };

    $scope.getAllChat();

    io.socket.on('chatroom',function(event){
      //Check whether the verb is created or not
      if(event.verb === 'messaged'){
        $log.info(event);
        console.log(event);
        $scope.chatList.push(event.data);
        console.log('afterpush');
        // Add the data to current chatList
        // Call $scope.$digest to make the changes in UI
        $scope.$digest();
      }
    });

    $scope.sendMsg = function(){
      $log.info($scope.chatMessage);
      io.socket.post(API_ENDPOINT.url + '/chatroom/sendMessage', {
        message: $scope.chatMessage,
        trip_id: $scope.trip_id
      });
      $scope.chatMessage = "";
    };

  });

