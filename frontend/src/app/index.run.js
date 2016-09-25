(function() {
  'use strict';

  angular
    .module('frontend')
    .run(runBlock);

  runBlock.$inject = ['$log','$rootScope','$state']

  /** @ngInject */
  function runBlock($log,$rootScope,$state) {

    $log.debug('runBlock end');

    //
    // $rootScope.$on('$stateChangeStart', function(event, toState) {
    // // })
    $rootScope.$on( "$stateChangeError", function( event, toState, toParams, fromState, fromParams){
        return $state.go( 'home' );
    });

  }

})();
