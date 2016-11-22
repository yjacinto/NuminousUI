
angular.module('numinousUiApp')
  .controller('FriendCtrl', function (AuthService, API_ENDPOINT, $http, $scope) {

    $scope.users = '';
    $scope.friends = '';

    //may delete
    /*var getUserFriends = function () {
      $http.get(API_ENDPOINT.url + '/user/getUserFriends').then(function (result) {
        if (result.status) {
          console.log(result.data.msg);
        } else {
          reject(result.data.msg);
        }
      });
    };*/

    //gets all users that have been registered in the database.
    var getUsers = function(){
      $http.get(API_ENDPOINT.url + '/user/getNonFriends').then(function (result) {
        if (result.status) {
          console.log(result.data);
          $scope.users = result.data;
        } else {
          reject(result.data.msg);
        }
      });
    };

    $scope.addFriend = function(friend, index){
      var data = {
        friend_id : friend.id
      };
      $http.post(API_ENDPOINT.url + '/friend/addFriend', data ).then(function(result){
        if (result.status) {
          console.log('added');
          $scope.users.splice(index, 1);
          $scope.friends.push(friend);
        } else {
          reject(result.data.msg);
        }
      });
    };

    var getFriends = function(){
      $http.get(API_ENDPOINT.url + '/user/getFriends').then(function (result) {
        if (result.status) {
          console.log(result.data);
          $scope.friends = result.data;
        } else {
          reject(result.data.msg);
        }
      });
    };

    $scope.deleteFriend = function(friend, index){
      var data = {
        friend_id : friend.id
      };
      $http.post(API_ENDPOINT.url + '/friend/deleteFriend', data).then(function (result) {
        if (result.status) {
          console.log(result.data);
          $scope.friends.splice(index, 1);
          $scope.users.push(friend);
        } else {
          reject(result.data.msg);
        }
      });
    };

    $scope.addCompanion= function(trip_id, companion_id){
      console.log('fired');
      var data = {
        trip_id : trip_id,
        companion_id : companion_id
      };
      var command = encodeURI(API_ENDPOINT.url + '/travelCompanion/addCompanion');
      $http.post(command, data)
        .then(function(res){
          console.log('added friend');
        });

    };

    //working on displaying get users  and get user friends.
    getUsers();
    getFriends();
  })
