(function() {
  'use strict';

  angular
    .module('frontend')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('app', {
        url: '/',
        template:'<ui-view/>',
        abstract:true
      })
      .state('home', {
         url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'mainCtrl'
        // abstract:true
      })
      .state('profile', {
        url: 'profile',
        parent:'home',
        templateUrl: 'app/components/profile/profile.html',
        controller: 'ProfileController',
        controllerAs: 'profileCtrl',
          // resolve: ProfileController.resolve,
          resolve:{
              _sectionList : ['SectionListService',function(SectionListService){
                  return SectionListService.getSectionList()
              }]
          },
         params: {
            settings: {}
          }
      })
      .state('sectionAdd', {
        url: '',
          parent:'profile',
        templateUrl: 'app/components/section/sectionAdd/sectionAdd.html',
        controller: 'sectionAddController',
        controllerAs: 'sectionAddCtrl'
      })
      //  .state('startGamePage.retryGame', {
      //   // url: 'Game',
      //   templateUrl: 'app/components/retryGame/retryGame.html',
      //   controller: 'retryGameController',
      //   controllerAs: 'retryGameCtrl',
      // })

    $urlRouterProvider.otherwise('/');
  }

})();
