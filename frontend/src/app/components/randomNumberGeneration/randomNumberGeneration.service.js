(function() {
  'use strict';

  angular
      .module('frontend')
      .service('randomNumberGeneration', randomNumberGeneration);

  /** @ngInject */
  function randomNumberGeneration() {
    var vm = this;
    var randomlyUniqList = []
    var randomHashTable = {}
    var maxLimit

    vm.getList = function(){
      return randomlyUniqList;
    }

    vm.genarateRandom = function(maxLimit){

      return Math.floor((Math.random() * 10) )%maxLimit
    }

    var updateRandomHashTable = function(previousList){
      randomHashTable = {}
      previousList.forEach(function(obj){
        var key = obj.row + '_' + obj.col;
        if(obj.color = 'new')
        randomHashTable[key] = true;
      })
    }

    vm.modifyCell = function(obj){
      if(!obj) return;
      var key = obj.row+'_'+obj.col;
      if(randomHashTable.hasOwnProperty(key))
          delete randomHashTable[key]

      randomlyUniqList = randomlyUniqList.filter(function(obj1){
          if((obj1.row==obj.row) && (obj1.col==obj.col))
            return false;
          return true;
        })

    }

    vm.generateRandomList = function(numberOfElementRequired,maxLimitOfGeneration,previousList){
      maxLimit = maxLimitOfGeneration
      if(previousList && previousList.length!=0){
        updateRandomHashTable(previousList);
        randomlyUniqList = previousList
      }
      while(randomlyUniqList.length != numberOfElementRequired ){
        var temp = {}
        temp.row = vm.genarateRandom(maxLimitOfGeneration)
        temp.col = vm.genarateRandom(maxLimitOfGeneration)
        var key = temp.row+'_'+temp.col
        if(randomHashTable.hasOwnProperty(key))
          continue;
        randomlyUniqList.push(temp)
        randomHashTable[key] = true; 
      }
    }

  }

})();
