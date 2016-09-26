(function() {
    'use strict';

    angular
        .module('frontend')
        .controller('sectionDeleteController', sectionDeleteController);

    sectionDeleteController.$inject = ['$log','$uibModal','$state','$stateParams','SectionListService']

    /** @ngInject */
    function sectionDeleteController($log,$uibModal,$state,$stateParams,SectionListService) {
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
                templateUrl: 'app/components/section/sectionDelete/sectionDelete.html',
                controller: 'ModalInstanceCtrlDelete',
                controllerAs: '$ctrlDelete',
                // bindToController:true,
                size: size,
                resolve: {
                    items: function () {
                        return vm.items;
                    },
                    order:function(){
                        return vm.positionDropDown
                    },
                    selectedItem:function(){
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
                $state.go('profile',null,{reload: true})
            }, function () {
                $state.go('profile',null,{reload: true})
                $log.info('Modal dismissed at: ' + new Date());
            });
            modalInstance.closed.then(function (selectedItem) {
                $state.go('profile',null,{reload: true})
            }, function () {
                $state.go('profile',null,{reload: true})
                $log.info('Modal dismissed at: ' + new Date());
            });

        };

        vm.open()
    }
})();

(function() {
    'use strict';

    angular
        .module('frontend')
        .controller('ModalInstanceCtrlDelete', ModalInstanceCtrlDelete);

    ModalInstanceCtrlDelete.$inject = ['$uibModalInstance','items','selectedItem','SectionDeleteService','SectionListService']

    /** @ngInject */
    function ModalInstanceCtrlDelete($uibModalInstance,items,selectedItem,SectionDeleteService,SectionListService) {
        var vm = this;
        vm.items = items
        vm.orderDropDown = {availableSections:[]}
        var orderDropDownInDropdown = JSON.parse(JSON.stringify(SectionListService.getavailableOrderPosition()))
        for(var prop in orderDropDownInDropdown){
            if(orderDropDownInDropdown.hasOwnProperty(prop)){
                vm.orderDropDown.availableSections.push(orderDropDownInDropdown[prop])
            }
        }

        vm.SectionListDropDown = {availableSections:[]}
        var sectionListInDropdown = JSON.parse(JSON.stringify(SectionListService.getAvailableRelativeSection()))
        for(var prop in sectionListInDropdown){
            if(sectionListInDropdown.hasOwnProperty(prop)){
                vm.SectionListDropDown.availableSections.push(sectionListInDropdown[prop])
            }
        }

        vm.selectedItem = selectedItem


        vm.ok = function () {
            var res = SectionListService.getavailableOrderPosition()
            console.log(res)
            vm.selectedItem.order = SectionListService.getavailableOrderPosition()[vm.selectedItem.order.name]
            vm.selectedItem.section = SectionListService.getAvailableRelativeSection()[vm.selectedItem.section.name]
            if(vm.selectedItem.items.position.alias=="Above")
                vm.selectedItem.items.position = SectionListService.getavailableOrderPosition()['above']
            else
                vm.selectedItem.items.position = SectionListService.getavailableOrderPosition()['down']
            $uibModalInstance.close(vm.selectedItem.items);
            SectionDeleteService.editSection(angular.copy(vm.selectedItem))
        };

        vm.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();