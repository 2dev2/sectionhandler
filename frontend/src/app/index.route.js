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
        controllerAs: 'main',
        // abstract:true
      })
      .state('startGamePage', {
        url: '/Game',
        templateUrl: 'app/components/startPageGame/startPageGame.html',
        controller: 'startGameController',
        controllerAs: 'gameCtrl',
         params: {
            settings: {}
          }
      })
      .state('startGamePage.gameOver', {
        // url: 'Game',
        templateUrl: 'app/components/gameOver/gameOver.html',
        controller: 'gameOverController',
        controllerAs: 'gameOverCtrl',
      })
       .state('startGamePage.retryGame', {
        // url: 'Game',
        templateUrl: 'app/components/retryGame/retryGame.html',
        controller: 'retryGameController',
        controllerAs: 'retryGameCtrl',
      })

    $urlRouterProvider.otherwise('/');
  }

})();
