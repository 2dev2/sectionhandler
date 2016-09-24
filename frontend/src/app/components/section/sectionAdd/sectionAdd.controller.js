(function() {
    'use strict';

    angular
        .module('frontend')
        .controller('sectionAddController', sectionAddController);

    sectionAddController.$inject = ['$log','$uibModal','$state']

    /** @ngInject */
    function sectionAddController($log,$uibModal,$state) {
        var vm = this;
        $log.debug("add")
        vm.name = 'theNameHasBeenPassed';
        vm.items = ['item1', 'item2', 'item3'];
        vm.animationsEnabled = true;
        vm.open = function (size) {
            var modalInstance = $uibModal.open({
                animation: vm.animationsEnabled,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'app/components/section/sectionAdd/sectionAdd.html',
                controller: 'ModalInstanceCtrl',
                controllerAs: '$ctrl',
                size: size,
                resolve: {
                    items: function () {
                        return vm.items;
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

    ModalInstanceCtrl.$inject = ['$uibModalInstance','items']

    /** @ngInject */
     function ModalInstanceCtrl($uibModalInstance,items) {
        var vm = this;
        vm.items = items
        vm.selected = {
            item: vm.items[0]
        };

        vm.ok = function () {
            $uibModalInstance.close(vm.selected.item);
        };

        vm.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();



























// var ModalInstanceCtrl = function($scope, $uibModalInstance, $uibModal, item) {
//
//     vm.item = item;
//
//     vm.ok = function () {
//         $uibModalInstance.close();
//     };
//
//     vm.cancel = function () {
//         $uibModalInstance.dismiss('cancel');
//     };
// }
