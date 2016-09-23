(function() {
    'use strict';

    angular
        .module('frontend')
        .service('sidebarOptionsService', sidebarOptionsService);

    /** @ngInject */
    function sidebarOptionsService() {
        var data = [
            {
                id:1,
                name:'view',
                type:[
                    {id:4,name:'profile'},
                    {id:4,name:'signup'}

                ]
                // 'title': 'AngularJS',
                // 'url': 'https://angularjs.org/',
                // 'description': 'HTML enhanced for web apps!',
                // 'logo': 'angular.png'
            },
            {
                id:1,
                name:' default profiles',
                type:[

                ]
                // 'title': 'BrowserSync',
                // 'url': 'http://browsersync.io/',
                // 'description': 'Time-saving synchronised browser testing.',
                // 'logo': 'browsersync.png'
            },
            {
                id:1,
                name:'properties',
                type:[

                ]
                // 'title': 'GulpJS',
                // 'url': 'http://gulpjs.com/',
                // 'description': 'The streaming build system.',
                // 'logo': 'gulp.png'
            }

        ];

        this.getSidebarOptions = getSidebarOptions;

        function getSidebarOptions() {
            return data;
        }
    }

})();
