(function() {
    'use strict';

    angular
        .module('frontend')
        .controller('sectionEditController', sectionEditController);

    sectionEditController.$inject = ['$log','$uibModal','$state','$stateParams','SectionListService']

    /** @ngInject */
    function sectionEditController($log,$uibModal,$state,$stateParams,SectionListService) {
        var vm = this;
        vm.items = $stateParams.section
        vm.positionDropDown = {
            availableOptions: [
                {id: '0', name: "above", alias: "Above"},
                {id: '1', name: "down",alias: "Down"}
            ]
        };
        vm.positionDropDown.selectedOption=vm.positionDropDown.availableOptions[0];
        vm.animationsEnabled = true;
        vm.open = function (size) {
            var modalInstance = $uibModal.open({
                animation: vm.animationsEnabled,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'app/components/section/sectionEdit/sectionEdit.html',
                controller: 'ModalInstanceCtrlEdit',
                controllerAs: '$ctrlEdit',
                // bindToController:true,
                size: size,
                resolve: {
                    items: function () {
                        console.log(vm.items,"edit this")
                        return vm.items;
                    },
                    order:function(){
                        return vm.positionDropDown
                    },
                    selectedItem:function(){
                        console.log(vm.items)
                        // var releativeSection = {}
                        // releativeSection =  {id: '0', alias: vm.items.relativeSection}
                        // if(vm.items.relativeSection=="BIODATA")
                        //     releativeSection.name = 'bio'
                        // else
                        //         releativeSection.name = 'edu'

                        var selectedItem = { }
                        selectedItem.sectionType = 1
                        selectedItem.items = vm.items
                        selectedItem.order = vm.items.position
                        selectedItem.section = vm.items.relativeSection
                        selectedItem.sectionName = vm.items.sectionName
                        return selectedItem;
                    }
                }
            });
            modalInstance.result.then(function (selectedItem) {
                console.log(selectedItem,"result")
                // vm.selected1.sectionName = ''
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
            // modalInstance.opened.then(function (selectedItem) {
            //     console.log(selectedItem,"opened")
            //     vm.selected = selectedItem;
            // }, function () {
            //     $log.info('Modal dismissed at: ' + new Date());
            // });

            $state.go('profile')
        };

        vm.open()
    }
})();

(function() {
    'use strict';

    angular
        .module('frontend')
        .controller('ModalInstanceCtrlEdit', ModalInstanceCtrlEdit);

    ModalInstanceCtrlEdit.$inject = ['$uibModalInstance','items','selectedItem','SectionEditService']

    /** @ngInject */
    function ModalInstanceCtrlEdit($uibModalInstance,items,selectedItem,SectionEditService) {
        var vm = this;
        console.log(items,"modal instance")
        vm.items = items
        vm.orderDropDown = {
            availableSections: [
                {id: '0', name: "above", alias: "Above"},
                {id: '1', name: "down", alias: "Down"}
            ]
        };
        // vm.orderDropDown.selectedOption = vm.orderDropDown.availableSections[0];

        vm.SectionListDropDown = {
            availableSections: [
                {id: '0', name: "bio", alias: "BIODATA"},
                {id: '1', name: "edu", alias: "EDUCATION"}
            ]
        }
        vm.selectedItem = { }
        vm.selectedItem = {
            sectionType:1,
            items: vm.items[0],
            order:vm.orderDropDown.availableSections[0],
            section:vm.SectionListDropDown.availableSections[0],
            sectionName:''
        };
        // selectedItem.sectionType = 1
        // selectedItem.items = vm.items
        // selectedItem.order = vm.items.position
        // selectedItem.section = vm.items.relativeSection
        // selectedItem.sectionName = vm.items.sectionName
        // return selectedItem;
         vm.selectedItem.order.name = selectedItem.order
        vm.selectedItem.section.name = selectedItem.section
        vm.selectedItem.sectionName = selectedItem.sectionName
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%",vm.selectedItem)



        vm.ok = function () {
            $uibModalInstance.close(vm.selectedItem.items);
            SectionEditService.editSection(angular.copy(vm.selectedItem))
            // $event.stopPropagation();
        };

        vm.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();