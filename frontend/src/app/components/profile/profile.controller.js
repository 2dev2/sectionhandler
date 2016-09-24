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
        // $log.debug($state,vm.sectionList,_sectionList)
    }

})();