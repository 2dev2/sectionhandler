(function() {
    'use strict';

    angular
        .module('frontend')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['$state','_sectionList']

    // ProfileController.resolve = {
    //     _sectionList :['sectionListService',function(sectionListService){
    //         return sectionListService.getSectionList()
    //     }]
    // }

    /** @ngInject */
    function ProfileController($state,_sectionList) {
        var vm = this;
        vm.sectionList = [1,2,3,4]
        console.log($state,vm.sectionList,_sectionList)
    }



})();