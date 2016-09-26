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
                $log.info(selectedItem,"result")
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
        .controller('ModalInstanceCtrlEdit', ModalInstanceCtrlEdit);

    ModalInstanceCtrlEdit.$inject = ['$uibModalInstance','items','selectedItem','SectionEditService','SectionListService']

    /** @ngInject */
    function ModalInstanceCtrlEdit($uibModalInstance,items,selectedItem,SectionEditService,SectionListService) {
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
        // {
        //     sectionType:1,
        //     items: vm.items,
        //     order:vm.orderDropDown.availableSections[0],
        //     section:vm.SectionListDropDown.availableSections[0],
        //     sectionName:''
        // };


        vm.ok = function () {
            var res = SectionListService.getavailableOrderPosition()
            console.log(res)
            vm.selectedItem.order = SectionListService.getavailableOrderPosition()[vm.selectedItem.order.name]
            vm.selectedItem.section = SectionListService.getAvailableRelativeSection()[vm.selectedItem.section.name]
            if(vm.selectedItem.items.position.alias=="Above")
                vm.selectedItem.items.position = SectionListService.getavailableOrderPosition()['above']
            else
                vm.selectedItem.items.position = SectionListService.getavailableOrderPosition()['name']
            $uibModalInstance.close(vm.selectedItem.items);
            SectionEditService.editSection(angular.copy(vm.selectedItem))
        };

        vm.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        // var vm = this;
        // console.log(items,"modal instance")
        // vm.items = items
        // vm.orderDropDown = {
        //     availableSections: [
        //         {id: '0', name: "above", alias: "Above"},
        //         {id: '1', name: "down", alias: "Down"}
        //     ]
        // };
        // vm.SectionListDropDown = {
        //     availableSections: [
        //         {id: '0', name: "bio", alias: "BIODATA"},
        //         {id: '1', name: "edu", alias: "EDUCATION"}
        //     ]
        // }
        // vm.selectedItem = selectedItem
        // vm.selectedItem.items = items
        // // getAvailableRelativeSection
        // function getProperListFromObj(obj){
        //     var res = []
        //     for (prop in objList){
        //         if(objList.hasOwnProperty(prop))
        //             res.push()
        //     }
        //
        //
        // }
        //
        // function getProperObject(prop,value,objList){
        //     var res = ''
        //     objList.filter(function(obj){
        //         if(obj[prop]==value) {
        //             res = obj;
        //         }
        //     })
        //     return res;
        // }
        //
        // vm.ok = function () {
        //     vm.selectedItem.order = getProperObject('name',vm.selectedItem.order.name,vm.orderDropDown.availableSections)
        //     vm.selectedItem.section = getProperObject('name',vm.selectedItem.section.name,vm.SectionListDropDown.availableSections)
        //     $uibModalInstance.close(vm.selectedItem.items);
        //     SectionEditService.editSection(angular.copy(vm.selectedItem))
        // };
        //
        // vm.cancel = function () {
        //     $uibModalInstance.dismiss('cancel');
        // };
    }
})();