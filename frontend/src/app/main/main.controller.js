(function() {
  'use strict';

  angular
    .module('frontend')
    .controller('MainController', MainController);

  MainController.$inject = ['$state']

  /** @ngInject */
  function MainController($state) {
    var vm = this;
    vm.data = "main controller"
    vm.whichMenuSelectedFromSidebar = whichMenuSelectedFromSidebar;
    function whichMenuSelectedFromSidebar(menu){
      //goto This state
      $state.go(menu)
      // $state.go('transition', {destination:'menu'});
      // $state.go(menu, {}, {reload: true,inherit: false, notify: true});
      $state.transitionTo(menu, null, {'reload':true});


//       $state.go('new-state');
// //temporary workaround to ensure reload
//       $state.go('transition', {destination: 'new-state'});
// @aphexddb
//
//       aphexddb commented on 12 Feb 2014
// @PeterMajer great hack, i was using
//
//       $state.transitionTo('new-state', null, {'reload':true});
    }

  }
})();