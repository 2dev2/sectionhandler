(function() {
    'use strict';

    angular
        .module('frontend')
        .service('SectionListService', SectionListService);
    SectionListService.$inject = []

    /** @ngInject */
    function SectionListService() {
        var sectionList = [
            {
                id:1,
                sectionName:'BIODATA',
                description: 'HTML enhanced for web apps!',
                logo: 'angular.png',
                position:'above',
                OrderIndex:2,
                headerSectionOpeartion  :[
                    {operation:'edit'},
                    {operation:'delete'},
                    {operation:'move'}
                ],
                fieldOperation:['add-field','create field group'],
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
                position:'below',
                OrderIndex:1,
                headerSectionOpeartion:[{operation:'default'}],
                fieldOperation:['add-field','create field group'],
                field:[
                    {field1:{id:5,name:'profile'}},
                    {field2:{id:6,name:'signup'}}
                ]
            }
        ];
        this.getSectionList = getSectionList
        function getSectionList() {
            return sectionList;
        }
    }

})();
