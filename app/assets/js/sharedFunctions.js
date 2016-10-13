/**
 * Created by Eevee on 10/6/16.
 */
'use strict';

angular.module('NuminousUI')
  .factory("sharedFunctionsService", function ($timeout) {

    var addNotification = function (myStatus, myMessage, userNotificationsList) {
      var index = userNotificationsList.length; //this is used more for splicing success messages than anything else
      var notification = {
        status: myStatus
        , message: myMessage
        , isHidden: false
      };
      userNotificationsList[index] = notification;
      //timeout success messages
      if (myStatus == 'Success') {
        var clearSuccessMessage = $timeout(function () {
          userNotificationsList[index].isHidden = true;
        }, 10000);
      }else if(myStatus == 'Warning'){
        var clearSuccessMessage = $timeout(function () {
          userNotificationsList[index].isHidden = true;
        }, 5000);
      }
      return userNotificationsList;
    };

    // Public API here
    return {
      addNotification: addNotification
    };
  });
