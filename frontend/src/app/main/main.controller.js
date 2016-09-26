(function() {
  'use strict';

  angular
    .module('frontend')
    .controller('MainController', MainController);

  MainController.$inject = []

  /** @ngInject */
  function MainController() {
    var vm = this;
    vm.data = "main controller"
    vm.whichMenuSelectedFromSidebar = whichMenuSelectedFromSidebar;
    function whichMenuSelectedFromSidebar(){
    }

  }
})();