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
        vm.items = $stateParams.section; //SectionListService.getSectionList() // {} //$stateParams.section;
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
                    items: function () {
                        return vm.items;
                    },
                    order:function(){
                        return vm.positionDropDown
                    }
                }
            });
            // modalInstance.result.then(function (selectedItem) {
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
        .controller('ModalInstanceCtrl', ModalInstanceCtrl);

    ModalInstanceCtrl.$inject = ['$uibModalInstance','items','SectionEditService']

    /** @ngInject */
     function ModalInstanceCtrl($uibModalInstance,items,SectionEditService) {
        var vm = this;
         vm.items= items
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
            items: vm.items,
            order:vm.orderDropDown.availableSections[0],
            section:vm.SectionListDropDown.availableSections[0],
            sectionName : vm.items.sectionName
        };
        // vm.selected.sectionName =  vm.selected.items.sectionName

        // vm.ok = function () {
        //     SectionEditService.editSection(angular.copy(vm.selected))
        //     $uibModalInstance.close(vm.selected.items);
        // };
        //
        // vm.cancel = function () {
        //     $uibModalInstance.dismiss('cancel');
        // };

    }
})();