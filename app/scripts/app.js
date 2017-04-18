(function(){
'use strict';

/**
 * @ngdoc overview
 * @name exchange
 * @description
 * exchange rate list and conversion
 *
 * Main module of the application.
 */
angular.module('exchange', ['appController','mainService','ui-notification'])
   .constant('config',{
         appName: 'exchange',
         apiUrl:'https://exchange1704.herokuapp.com/api/',
         apikey:"ca5f41e1722a406d90028f4ae6e2de15", 
         contentTypeConfig:{
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
       }
   })
   .config(function(NotificationProvider,$httpProvider){  
    NotificationProvider.setOptions({
        delay: 10000
        , startTop: 20
        , startRight: 10
        , verticalSpacing: 20
        , horizontalSpacing: 20
        , positionX: 'left'
        , positionY: 'bottom'
      });
      $httpProvider.interceptors.push('AuthInterceptor');

  }); 
})();
