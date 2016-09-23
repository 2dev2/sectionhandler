(function() {
  'use strict';

  angular
    .module('frontend')
    .directive('acmeSidebar', acmeSidebar);

  /** @ngInject */
  function acmeSidebar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/sideBar/sidebar.html',
      // scope: {
      //     creationDate: '='
      // },
      controller: sidebarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function sidebarController(moment,$location) {
      var vm = this;

      // "vm.creationDate" is available by directive option "bindToController: true"
      // vm.relativeDate = moment(vm.creationDate).fromNow();
      // vm.isActive = function(viewLocation){
      //   return viewLocation == $location.path()
      // }
    }
  }

})();
