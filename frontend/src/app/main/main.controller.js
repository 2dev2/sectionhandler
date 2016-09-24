(function() {
  'use strict';

  angular
    .module('frontend')
    .controller('MainController', MainController);

  MainController.$inject = ['$state']

  /** @ngInject */
  function MainController($state) {
    var vm = this;
    vm.data = "main controller"
    vm.whichMenuSelectedFromSidebar = whichMenuSelectedFromSidebar;
    function whichMenuSelectedFromSidebar(menu){
      //goto This state
      $state.go(menu)
    }

  }
})();