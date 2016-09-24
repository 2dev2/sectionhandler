(function() {
  'use strict';

  angular
    .module('frontend')
    .directive('acmeSidebar', acmeSidebar);

   acmeSidebar.$inject = ['sidebarOptionsService']

  /** @ngInject */
  function acmeSidebar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/sideBar/sidebar.html',
      scope: {},
      bindToController: {
        whichMenuSelectedFromSidebar:'&'
      },
      controller: sidebarController,
      controllerAs: 'sidebarCtrl'
    };
    return directive;

    /** @ngInject */
    function sidebarController($log,sidebarOptionsService) {
      var vm = this;
      vm.options = sidebarOptionsService.getSidebarOptions()
    }
  }
})();
