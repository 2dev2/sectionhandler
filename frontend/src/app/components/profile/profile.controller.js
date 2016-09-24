(function() {
    'use strict';

    angular
        .module('frontend')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['$state']

    /** @ngInject */
    function ProfileController($state) {
        var vm = this;
        vm.sectionList = [1,2,3,4]
        console.log($state)

    }
})();