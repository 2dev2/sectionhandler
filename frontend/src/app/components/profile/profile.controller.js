(function() {
    'use strict';



    // ProfileController.resolve = {
    //     _sectionList :['sectionListService',function(sectionListService){
    //         return sectionListService.getSectionList()
    //     }]
    // }


    angular
        .module('frontend')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['$state','sectionListService']

    /** @ngInject */
    function ProfileController($state,sectionListService,_sectionList) {
        var vm = this;
        vm.sectionList = [1,2,3,4]
        console.log($state,vm.sectionList,sectionListService.getSectionList(),_sectionList)
    }



})();