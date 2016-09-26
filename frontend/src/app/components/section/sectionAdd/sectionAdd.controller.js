(function() {
    'use strict';

    angular
        .module('frontend')
        .controller('sectionAddController', sectionAddController);

    sectionAddController.$inject = ['$log','$uibModal','$state','SectionListService']

    /** @ngInject */
    function sectionAddController($log,$uibModal,$state,SectionListService) {
        var vm = this;
        vm.items = SectionListService.getSectionList()
        vm.animationsEnabled = true;
        vm.open = function (size) {
            var modalInstance = $uibModal.open({
                animation: vm.animationsEnabled,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'app/components/section/sectionAdd/sectionAdd.html',
                controller: 'ModalInstanceCtrl',
                controllerAs: '$ctrl',
                // bindToController:true,
                size: size,
                resolve: {
                    items: function () {
                        return vm.items;
                    }
                }
            });
            modalInstance.result.then(function (selectedItem) {
                console.log(selectedItem,"result")
                // vm.selected1.sectionName = ''
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });

            $state.go('profile')
        };

        vm.open()
    }
})();

(function() {
    'use strict';

    angular
        .module('frontend')
        .controller('ModalInstanceCtrl', ModalInstanceCtrl);

    ModalInstanceCtrl.$inject = ['$uibModalInstance','items','SectionAddService','SectionListService']

    /** @ngInject */
     function ModalInstanceCtrl($uibModalInstance,items,SectionAddService,SectionListService) {
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

        vm.selectedItem = {
            sectionType:1,
            items: vm.items[0],
            order:vm.orderDropDown.availableSections[0],
            section:vm.SectionListDropDown.availableSections[0],
            sectionName:''
        };


        vm.ok = function () {
            var res = SectionListService.getavailableOrderPosition()
            console.log(res)
            vm.selectedItem.order = SectionListService.getavailableOrderPosition()[vm.selectedItem.order.name]
             vm.selectedItem.section = SectionListService.getAvailableRelativeSection()[vm.selectedItem.section.name]
            $uibModalInstance.close(vm.selectedItem.items);
            SectionAddService.setNewSection(angular.copy(vm.selectedItem))
        };

        vm.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };



        // vm.SectionListDropDown.selectedOption = vm.SectionListDropDown.availableSections[0];

    }
})();