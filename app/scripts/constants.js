/**
 * Created by edwin on 10/26/16.
 */
angular.module('numinousUiApp')

  .constant('AUTH_EVENTS', {
    notAuthenticated: 'auth-not-authenticated'
  })

  .constant('API_ENDPOINT', {
    url: 'http://localhost:1337'
  });
