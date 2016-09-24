(function() {
    'use strict';

    angular
        .module('frontend')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['$log','$state','_sectionList']

    // ProfileController.resolve = {
    //     _sectionList :['SectionListService',function(SectionListService){
    //         return SectionListService.getSectionList()
    //     }]
    // }

    /** @ngInject */
    function ProfileController($log,$state,_sectionList) {
        var vm = this;
        vm.sectionList = _sectionList
        vm.sectionAdd = function (sectionAdd1) {
            // $log.debug(sectionAdd1)
            // $state.go('sectionAdd')
        }
        // $log.debug($state,vm.sectionList,_sectionList)
    }

})();