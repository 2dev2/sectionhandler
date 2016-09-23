(function() {
  'use strict';

  angular
    .module('frontend')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');

    //
    // $rootScope.$on('$stateChangeStart', function(event, toState) {
	// })

  }

})();
