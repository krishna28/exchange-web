(function(){
	
  'use strict'

  angular.module('appController', [])
  .controller('MainCtrl',function($scope,$q,MainService,Notification,$timeout){
    //
    var mainVm = this;
    mainVm.loading = true;  
    mainVm.unitOfCurr = 1;
    mainVm.currentDate = new Date();

     //function to assign data after ajax call
     var assignData = function assignData(result,history=null){
      if(result[0].status == 200){
        var exchangeRate = result[0].data;
        var currencies = result[1].data;
        var exchangeList = [];
        for (var x in exchangeRate.rates) {
          exchangeList.push({
            "currencyName": currencies[x],
            "code": x,
            "rate": exchangeRate.rates[x]
          });
        }
        $timeout(function() {
          mainVm.exchangeList = exchangeList;
        }, 0);
        mainVm.exchangeList = exchangeList;
        mainVm.currencies = currencies;
        mainVm.loading = false; 
        if(history){      
          mainVm.updating = false;  
        }  
      }else{
        mainVm.loading = false;
        var errorMsg = result[0].data.description || "500 error,will be fixed soon"
        Notification.error(errorMsg);
      }
    };

    mainVm.changeSelectedItem = function changeSelectedItem(){
      mainVm.calculateExchange();
    }


      // promise call to multiple service on application startup
      $q.all([MainService.getLatestExchange(), MainService.getCurrencies()]).then(function (result) {
        assignData(result);
      });

      // service to fetch old exchange rate based on specific date
      mainVm.oldExchange = function oldExchange(){
        mainVm.updating = true;
        var date = mainVm.currentDate;
        var year = date.getFullYear().toString();
        var dayn = date.getDate().toString();
        var month = +date.getMonth() + 1;
        if (month < 10) { 
          month = '0' + month; 
        }
        if (dayn < 10) { 
          dayn = '0' + dayn; 
        }
        var finalDateSting = year.concat("-").concat(month).concat("-").concat(dayn);
        $q.all([MainService.getHistoryExchange(finalDateSting), MainService.getCurrencies()]).then(function (result) {
          assignData(result,true);
        });      

      };

      //calculate  exchange rate based on source and target currency
      mainVm.calculateExchange =  function calculateExchange(){
        if(mainVm.fromCurrency && mainVm.toCurrency){
          var baseRateInUsd = (1/(+mainVm.fromCurrency.rate));
          var finalResult = baseRateInUsd  * (+mainVm.toCurrency.rate) * (+mainVm.unitOfCurr);
          mainVm.result = (+finalResult.toFixed(7)).toString(); 
        } 
      };

    })
})();	