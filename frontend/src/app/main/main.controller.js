(function() {
  'use strict';

  angular
    .module('frontend')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope,$state,$stateParams) {
    var vm = this;
    vm.showSttingOptionsButton = true
    vm.showSttingOptions = false
    vm.s = {numberOfRow:7,numberOfCountDownSeconds:15,numberOfRandomCell:4,numberOfChances:3}
    var setting = {}
    setting.numberOfRow = 7;
    setting.numberOfCountDownSeconds = 15;
    setting.numberOfRandomCell = 6
    setting.numberOfChances = 3
    vm.showHomeButton = true
    vm.startGame = function(){
      // vm.showHomeButton = false;
      $state.go('startGamePage' ,{settings:setting})
      // console.log("start Game Page")
    }

    vm.changeSettings = function(numberOfRow,numberOfCountDownSeconds,numberOfRandomCell,numberOfChances){
      setting.numberOfRow = +numberOfRow || +setting.numberOfRow ;
      setting.numberOfCountDownSeconds = +numberOfCountDownSeconds || +setting.numberOfCountDownSeconds;
      setting.numberOfRandomCell = +numberOfRandomCell || +setting.numberOfRandomCell
      setting.numberOfChances = +numberOfChances || +setting.numberOfChances

      // console.log('change setting',setting)  
    }

  }
})();