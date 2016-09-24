// (function() {
//   'use strict';
//
//   angular
//     .module('frontend')
//     .controller('sectionAdd', sectionAdd);
//
//   sectionAdd.$inject = ['$log']
//
//   /** @ngInject */
//   function sectionAddController($log) {
//     var vm = this;
//     $log.debug(vm.sectionData)
//   }
//
//   /** @ngInject */
//   function sectionAdd() {
//     var directive = {
//       restrict: 'E',
//       templateUrl: 'app/components/sectionAdd/sectionAdd.html',
//       scope: {
//       },
//       controller: sectionAddController,
//       controllerAs: 'sectionAddCtrl',
//       bindToController:{
//         sectionData:'='
//       }
//     };
//     return directive;
//
//
//   }
//
// })();
