(function() {
  'use strict';

  angular
    .module('frontend')
    .config(config);

  // config.$inject
  /** @ngInject */
  function config($logProvider, toastrConfig,$provide) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;



    // $provide.decorator('$state', function($delegate, $stateParams) {
    //   $delegate.forceReload = function() {
    //     return $delegate.go($delegate.current, $stateParams, {
    //       reload: true,
    //       inherit: false,
    //       notify: true
    //     });
    //   };
    //   return $delegate;
    // });
    //
  }

})();
