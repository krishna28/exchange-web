(function() {
  'use strict'

  angular.module('mainService', [])
  .factory('MainService', function($http,config) {

    var userServiceObject = {};

           //function to get latest update on currencies rate
           userServiceObject.getLatestExchange = function getLatestExchange(){
            return $http.get(config.apiUrl.concat("latest"));
          };
           //function to get latest update on available currencies
           userServiceObject.getCurrencies = function getCurrencies(){
            return $http.get(config.apiUrl.concat("currencies"));
          };
           //function to get latest update on currencies rate based on specfic date
           userServiceObject.getHistoryExchange = function getHistoryExchange(finalDateSting){
            return $http.get(config.apiUrl.concat("history?date="+finalDateSting));
          };

          return userServiceObject;

        })
  .factory('AuthInterceptor', function($q, $location, config,$window) {

    var interceptorFactory = {};

    
    interceptorFactory.request = function(config_p) {

      if(config.apikey) {
        config_p.headers['apikey'] = config.apikey;
      }
      return config_p;

    };
    
    interceptorFactory.responseError = function(response){
      if(response.status == 403){
        console.log("unauthorized error");
        $window.location = '/403.html';
        $q.reject(response);
        
      }
      if(response.status == 401){
        $window.location = '/403.html';
        return $q.reject(response);
        
      }
      
      if(response.status == -1){
        
        return $q.reject(response);
      }
      if(response.status == 500){
        $location.path("/500.html");
        return $q.reject(response);
        
      }
      
    }
    
    return interceptorFactory;
  });
})();
