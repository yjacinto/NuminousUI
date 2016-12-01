/**
 * Created by edwin on 11/28/16.
 */

'use strict';

angular.module('numinousUiApp')
  .controller('ChatCtrl', function ($scope, $log, $http, API_ENDPOINT, $stateParams, trip) {

    $scope.predicate = '-id';
    $scope.reverse = false;
    $scope.chatList = [];
    //$scope.trip_id = $stateParams.trip_id;


    var getInfo = function(){
      $http.get(API_ENDPOINT.url + '/user/getInfo')
        .success(function(response) {
          console.log(response);
        $scope.user = response.first_name + ' ' + response.last_name;
      }).error(function(){
        console.log('couldnt find user');
      })
    };
    getInfo();

    $scope.getAllChat= function() {
      //establish socket connection
      console.log('inside getAllChat');
      io.socket.post(API_ENDPOINT.url + '/chatroom/addUserToChat',{
        trip_id : trip.trip_id
      },function (success_data, jwRes) {
          //$scope.chatList.push(success_data);
          $scope.chatList = success_data;
          console.log('chatlist: ' + Array.toString($scope.chatList));
          $scope.$digest();

        });
    };

    $scope.getAllChat();

    io.socket.on('chatroom',function(event){
      //Check whether the verb is created or not
      if(event.verb === 'messaged'){
        $log.info('event ' + JSON.stringify(event));
        $scope.chatList.push(event.data);
        console.log('afterpush');
        // Add the data to current chatList
        // Call $scope.$digest to make the changes in UI
        $scope.$digest();
      }
    });

    $scope.sendMsg = function(){
      $log.info($scope.chatMessage);
      if($scope.chatMessage) {
        io.socket.post(API_ENDPOINT.url + '/chatroom/sendMessage', {
          user: $scope.user,
          message: $scope.chatMessage,
          trip_id: trip.trip_id
        });
        $scope.chatMessage = "";
      }
    };

    $scope.fromUser = function(chat_user){
      console.log($scope.user === chat_user);
      return $scope.user === chat_user;
    }
  });

