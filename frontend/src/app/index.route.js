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
         //  parent:'app',
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
                 return  SectionListService.getSectionList()
              }]
          },
         params: {
            settings: {}
          }
      })
      .state('sectionAdd', {
        url: '/sectionAdd',
          parent:'profile',
        templateUrl: 'app/components/section/sectionAdd/sectionAdd.html',
        controller: 'sectionAddController',
        controllerAs: 'sectionAddCtrl'
      })
        .state('sectionedit', {
            url: '/sectionEdit',
            parent:'profile',
            templateUrl: 'app/components/section/sectionEdit/sectionEdit.html',
            controller: 'sectionEditController',
            controllerAs: 'sectionEditCtrl',
            params:{
                section:{}
            }
        })
        .state('sectiondelete', {
            url: '/sectionDelete',
            parent:'profile',
            templateUrl: 'app/components/section/sectionDelete/sectionDelete.html',
            controller: 'sectionDeleteController',
            controllerAs: 'sectionDeleteCtrl',
            params:{
                section:{}
            }
        })
        .state('sectionmove', {
            url: '/sectionMove',
            parent:'profile',
            templateUrl: 'app/components/section/sectionMove/sectionMove.html',
            controller: 'sectionMoveController',
            controllerAs: 'sectionMoveCtrl',
            params:{
                section:{}
            }
        })
        .state('signup', {
            url: 'signup',
            parent:'home',
            templateUrl: 'app/components/signup/signup.html',
            controller: 'SignupController',
            controllerAs: 'signupCtrl'

        })

    $urlRouterProvider.otherwise('/');
  }

})();
