//this directive handle the timer
(function() {
  'use strict';

  angular
    .module('frontend')
    .directive('timerCountdown', timerCountdown);

  /** @ngInject */
  function timerCountdown(malarkey) {
    var directive = {
      restrict: 'E',
      scope: {
        countDownTime: '=?',
         timerObject:'=?'
      },
      templateUrl: 'app/components/timerCountdown/timerCountdown.html',
      link: linkFunc,
      controller: timerCountdownController,
      controllerAs: 'vm'
    };

    return directive;

    function linkFunc(scope, el, attr, vm) {
      console.log("directive",scope.timerObject,scope,vm)
      // scope.timerObject = vm;
      // console.log("countDownTime",scope.countDownTime)
      vm.countDownTime = scope.countDownTime

     vm.timerRunning = true;
 
            vm.startTimer = function (){
                scope.$broadcast('timer-start');
                vm.timerRunning = true;
            };
 
            vm.stopTimer = function (){
                scope.$broadcast('timer-stop');
                vm.timerRunning = false;
            };
            vm.stopResumeTimer = function(){
              var self = this;
              scope.stopResumeTimer('clock-timer', this)
            }
    }

    /** @ngInject */
    function timerCountdownController($log, githubContributor) {
      var vm = this;
    }

  }

})();
