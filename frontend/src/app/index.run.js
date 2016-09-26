(function() {
  'use strict';

  angular
    .module('frontend')
    .run(runBlock);

  runBlock.$inject = ['$log']

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');

    //
    // $rootScope.$on('$stateChangeStart', function(event, toState) {
    // // })
    // $rootScope.$on( "$stateChangeError", function( event, toState, toParams, fromState, fromParams){
    //     return $state.go( 'home' );
    // });

  }

})();
