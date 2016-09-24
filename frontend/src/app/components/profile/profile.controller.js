(function() {
    'use strict';

    angular
        .module('frontend')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['$log','$uibModal','$state','_sectionList']

    // ProfileController.resolve = {
    //     _sectionList :['SectionListService',function(SectionListService){
    //         return SectionListService.getSectionList()
    //     }]
    // }

    /** @ngInject */
    function ProfileController($log,$uibModal,$state,_sectionList) {
        var vm = this;
        vm.sectionList = _sectionList
        // var modalInstance = $uibModal.open({
        //     templateUrl: 'app/components/profile/popup.html',
        // });
        vm.sectionAdd = function () {
             $state.go('sectionAdd')
        }
        // $log.debug($state,vm.sectionList,_sectionList)
    }

})();