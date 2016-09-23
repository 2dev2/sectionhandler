(function() {
  'use strict';

  angular
    .module('frontend')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log,$rootScope) {

    $log.debug('runBlock end');


    $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
 	// called every time the state transition is attempted
 	console.log('state change',toState)
	})

  }

})();
