(function() {
    'use strict';

    angular
        .module('frontend')
        .service('sectionListService', sectionListService);

    /** @ngInject */
    function sectionListService() {
        var sectionList = [
            {
                id:1,
                sectionName:'BIODATA',
                description: 'HTML enhanced for web apps!',
                logo: 'angular.png',
                position:{},
                OrderIndex:1,
                field:[
                    {field1:{id:4,name:'profile'}},
                    {field2:{id:4,name:'signup'}}
                ]
            },
            {
                id:2,
                sectionName:'EDUCATION',
                description: 'HTML enhanced for web apps!',
                logo: 'angular.png',
                position:{},
                OrderIndex:2,
                field:[
                    {field1:{id:5,name:'profile'}},
                    {field2:{id:6,name:'signup'}}
                ]
            }
            // {
            //     id:1,
            //     sectionName:'a1',
            //     description: 'HTML enhanced for web apps!',
            //     logo: 'angular.png'
            //     position:{},
            //     OrderIndex:1,
            //     field:[
            //         {field1:{id:4,name:'profile'}},
            //         {field2:{id:4,name:'signup'}}
            //     ]
            // },


        ];

        this.getSectionList =getSectionList
        function getSectionList() {
            return sectionList;
        }
    }

})();