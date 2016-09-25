(function() {
    'use strict';

    angular
        .module('frontend')
        .controller('sectionEditController', sectionEditController);

    sectionEditController.$inject = ['$log','$uibModal','$state','$stateParams','SectionListService']

    /** @ngInject */
    function sectionEditController($log,$uibModal,$state,$stateParams,SectionListService) {
        var vm = this;
        console.log('$stateParams',$stateParams)
        vm.item =  {} //$stateParams.section;
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
                controller: 'ModalInstanceCtrl',
                controllerAs: '$ctrl',
                size: size,
                resolve: {
                    item: function () {
                        return vm.item;
                    },
                    order:function(){
                        return vm.positionDropDown
                    }
                }
            });
            modalInstance.result.then(function (selectedItem) {
                vm.selected = selectedItem;
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

    ModalInstanceCtrl.$inject = ['$uibModalInstance','item','SectionEditService']

    /** @ngInject */
     function ModalInstanceCtrl($uibModalInstance,item,SectionEditService) {
        var vm = this;
        vm.item = item
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
        vm.selected = {
            sectionType:1,
            item: vm.item,
            order:vm.orderDropDown.availableSections[0],
            section:vm.SectionListDropDown.availableSections[0]
        };
        vm.selected.sectionName =  vm.selected.item.sectionName

        vm.ok = function () {
            SectionEditService.editSection(angular.copy(vm.selected))
            $uibModalInstance.close(vm.selected.item);
        };

        vm.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

    }
})();