(function() {
  'use strict';

  angular
    .module('frontend')
    .directive('section', section);

  section.$inject = ['$log']

  /** @ngInject */
  function section() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/section/section.html',
      scope: {
      },
      controller: sectionController,
      controllerAs: 'sectionCtrl',
      bindToController:{
        sectionData:'='
      }
    };
    return directive;

    /** @ngInject */
    function sectionController($log) {
      var vm = this;
      // $log.debug(vm.sectionData)
    }
  }

})();
