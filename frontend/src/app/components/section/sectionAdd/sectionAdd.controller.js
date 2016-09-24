(function() {
    'use strict';

    angular
        .module('frontend')
        .controller('sectionAddController', sectionAddController);

    sectionAddController.$inject = ['$log']

    /** @ngInject */
    function sectionAddController($log) {
        var vm = this;
        $log.debug("add")
    }

    // /** @ngInject */
    // function sectionAdd() {
    //     var directive = {
    //         restrict: 'E',
    //         templateUrl: 'app/components/sectionAdd/sectionAdd.html',
    //         scope: {
    //         },
    //         controller: sectionAddController,
    //         controllerAs: 'sectionAddCtrl',
    //         bindToController:{
    //             sectionData:'='
    //         }
    //     };
    //     return directive;
    //
    //
    // }

})();
