// (function() {
//     'use strict';
//
//     angular
//         .module('frontend')
//         .controller('sectionDeleteController', sectionDeleteController);
//
//     sectionDeleteController.$inject = ['$log','$uibModal','$state','SectionListService']
//
//     /** @ngInject */
//     function sectionDeleteController($log,$uibModal,$state,SectionListService) {
//         var vm = this;
//         vm.items = SectionListService.getSectionList()
//         vm.positionDropDown = {
//             availableOptions: [
//                 {id: '0', name: "above", alias: "Above"},
//                 {id: '1', name: "down",alias: "Down"}
//             ]
//         };
//         vm.positionDropDown.selectedOption=vm.positionDropDown.availableOptions[0];
//         vm.animationsEnabled = true;
//         vm.open = function (size) {
//             var modalInstance = $uibModal.open({
//                 animation: vm.animationsEnabled,
//                 ariaLabelledBy: 'modal-title',
//                 ariaDescribedBy: 'modal-body',
//                 templateUrl: 'app/components/section/sectionAdd/sectionAdd.html',
//                 controller: 'ModalInstanceCtrl',
//                 controllerAs: '$ctrl',
//                 size: size,
//                 resolve: {
//                     items: function () {
//                         return vm.items;
//                     },
//                     order:function(){
//                         return vm.positionDropDown
//                     }
//                 }
//             });
//             modalInstance.result.then(function (selectedItem) {
//                 vm.selected = selectedItem;
//             }, function () {
//                 $log.info('Modal dismissed at: ' + new Date());
//             });
//
//             $state.go('profile')
//         };
//
//         vm.open()
//     }
// })();
//
// (function() {
//     'use strict';
//
//     angular
//         .module('frontend')
//         .controller('ModalInstanceCtrl', ModalInstanceCtrl);
//
//     ModalInstanceCtrl.$inject = ['$uibModalInstance','items','SectionAddService']
//
//     /** @ngInject */
//      function ModalInstanceCtrl($uibModalInstance,items,SectionAddService) {
//         var vm = this;
//         vm.items = items
//         vm.orderDropDown = {
//             availableSections: [
//                 {id: '0', name: "above", alias: "Above"},
//                 {id: '1', name: "down", alias: "Down"}
//             ]
//         };
//         // vm.orderDropDown.selectedOption = vm.orderDropDown.availableSections[0];
//
//         vm.SectionListDropDown = {
//             availableSections: [
//                 {id: '0', name: "bio", alias: "BIODATA"},
//                 {id: '1', name: "edu", alias: "EDUCATION"}
//             ]
//         }
//         vm.selected = {
//             sectionType:1,
//             item: vm.items[0],
//             order:vm.orderDropDown.availableSections[0],
//             section:vm.SectionListDropDown.availableSections[0]
//         };
//         vm.selected.sectionName = ''
//
//         vm.ok = function () {
//             SectionAddService.setNewSection(angular.copy(vm.selected))
//             $uibModalInstance.close(vm.selected.item);
//         };
//
//         vm.cancel = function () {
//             $uibModalInstance.dismiss('cancel');
//         };
//
//
//
//         // vm.SectionListDropDown.selectedOption = vm.SectionListDropDown.availableSections[0];
//
//     }
// })();