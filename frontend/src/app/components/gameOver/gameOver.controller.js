(function() {
  'use strict';

  angular
    .module('frontend')
    .controller('gameOverController', gameOverController);

  /** @ngInject */
  function gameOverController($scope,$timeout, webDevTec,randomNumberGeneration,generateListOfObject,$state) {
     var vm = this;
      // vm.stopTimer = function (){
      //           $scope.$broadcast('timer-stop');
      //           vm.timerRunning = false;
      //       }();

  }

})();
