!function(){"use strict";angular.module("exchange",["appController","mainService","ui-notification"]).constant("config",{appName:"exchange",apiUrl:"https://exchange1704.herokuapp.com/api/",apikey:"ca5f41e1722a406d90028f4ae6e2de15",contentTypeConfig:{headers:{"Content-Type":"application/x-www-form-urlencoded;charset=utf-8;"}}}).config(["NotificationProvider","$httpProvider",function(a,b){a.setOptions({delay:1e4,startTop:20,startRight:10,verticalSpacing:20,horizontalSpacing:20,positionX:"left",positionY:"bottom"}),b.interceptors.push("AuthInterceptor")}])}(),function(){"use strict";angular.module("mainService",[]).factory("MainService",["$http","config",function(a,b){var c={};return c.getLatestExchange=function(){return a.get(b.apiUrl.concat("latest"))},c.getCurrencies=function(){return a.get(b.apiUrl.concat("currencies"))},c.getHistoryExchange=function(c){return a.get(b.apiUrl.concat("history?date="+c))},c}]).factory("AuthInterceptor",["$q","$location","config","$window",function(a,b,c,d){var e={};return e.request=function(a){return c.apikey&&(a.headers.apikey=c.apikey),a},e.responseError=function(c){return 403==c.status&&(console.log("unauthorized error"),d.location="/403.html",a.reject(c)),401==c.status?(d.location="/403.html",a.reject(c)):-1==c.status?a.reject(c):500==c.status?(b.path("/500.html"),a.reject(c)):void 0},e}])}();