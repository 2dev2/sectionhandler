(function() {
    'use strict';

    angular
        .module('frontend')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['$scope','$log','$uibModal','$state','_sectionList','SectionListService']

    // ProfileController.resolve = {
    //     _sectionList :['SectionListService',function(SectionListService){
    //         return SectionListService.getSectionList()
    //     }]
    // }

    /** @ngInject */
    function ProfileController($scope,$log,$uibModal,$state,_sectionList,SectionListService) {
        var vm = this;

        // // if($scope.$$phase)
        // $scope.$apply()
        vm.sectionList = _sectionList //SectionListService.getSectionList()
        vm.sectionAdd = function () {
             $state.go('sectionAdd')
        }
        // $log.debug($state,vm.sectionList,_sectionList)
    }

})();