(function() {
    'use strict';

    angular
        .module('frontend')
        .service('SectionListService', SectionListService);

    /** @ngInject */
    function SectionListService() {
        var sectionList = [
            {
                id:1,
                sectionName:'BIODATA',
                description: 'HTML enhanced for web apps!',
                logo: 'angular.png',
                position:{},
                OrderIndex:2,
                headerSectionOpeartion  :[
                    'edit',
                    'delete',
                    'move'
                ],
                fieldOperation:['add-group','craete feild group'],
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
                OrderIndex:1,
                headerSectionOpeartion:['default'],
                fieldOperation:['add-group','craete feild group'],
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
        var newSectionListDefaultArray = []
        var newSectionListDefault = [
            {
                id:1,
                sectionName:'BIODATA',
                description: 'HTML enhanced for web apps!',
                logo: 'angular.png',
                position:{},
                OrderIndex:1,
                headerSectionOpeartion  :[
                    'edit',
                    'delete',
                    'move'
                ],
                fieldOperation:['add-group','craete feild group'],
                field:[]
            },
            {
                id:2,
                sectionName:'EDUCATION',
                description: 'HTML enhanced for web apps!',
                logo: 'angular.png',
                position:{},
                OrderIndex:2,
                headerSectionOpeartion:['default'],
                fieldOperation:['add-group','craete feild group'],
                field:[]
            }
        ];

        this.getSectionList =getSectionList
        this.getnewSectionListDefault = getnewSectionListDefault
        function getSectionList() {
            return sectionList;
        }
        function getnewSectionListDefault() {
            return newSectionListDefault;
        }
    }

})();
