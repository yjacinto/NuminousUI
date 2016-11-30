/**
 * Created by edwin on 11/28/16.
 */

'use strict';

angular.module('numinousUiApp')
  .controller('ChatCtrl', function ($scope, $log, $http, API_ENDPOINT, $stateParams) {
    $scope.trip_id = $stateParams.trip_id;

    $scope.getAllChat= function() {
      //establish socket connection
      io.socket.get(API_ENDPOINT + '/chatroom/addControllerToChat');

      $http.get(API_ENDPOINT + '/chatroom/addControllerToChat')
        .success(function (success_data) {

          $scope.chatList = success_data;
          $log.info(success_data);
        });
    };

    $scope.getAllChat();

    io.socket.on('new_message',function(obj){
      //Check whether the verb is created or not
      if(obj.verb === 'new_message'){
        $log.info(obj)
        $scope.chatList.push(obj.data);
        // Add the data to current chatList
        // Call $scope.$digest to make the changes in UI
        $scope.$digest();
      }
    });

    $scope.sendMsg = function(){
      $log.info($scope.chatMessage);
      io.socket.post(API_ENDPOINT + '/chatroom/sendMessage', {
        message: $scope.chatMessage,
        trip_id: $scope.trip_id
      });
      $scope.chatMessage = "";
    };

  });

