(function() {
    'use strict';

    angular
        .module('frontend')
        .service('SectionListService', SectionListService);
    SectionListService.$inject = ['$log']

    /** @ngInject */
    function SectionListService($log) {
        var idcnt = 3
        var sectionList = [
            {
                id:1,
                sectionName:'BIODATA',
                description: 'HTML enhanced for web apps!',
                logo: 'angular.png',
                position:'above',
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
                position:'below',
                OrderIndex:1,
                headerSectionOpeartion:['default'],
                fieldOperation:['add-group','craete feild group'],
                field:[
                    {field1:{id:5,name:'profile'}},
                    {field2:{id:6,name:'signup'}}
                ]
            }
        ];
        var defaultSectionProp = {id:'',sectionName:'',position:'',relativeSection:'',OrderIndex:'',headerSectionOpeartion:['edit','delete','move'],fieldOperation:[],field:[]}
        var selectedSectionList = [
            {id: '0', name: "bio", alias: "bio"},
            {id: '1', name: "edu",alias: "edu"}
        ]
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

        this.getSectionList = getSectionList
        this.setNewSection = setNewSection
        this.getnewSectionListDefault = getnewSectionListDefault
        this.selectedSectionListFn = selectedSectionListFn
        
        function getSectionList() {
            return sectionList;
        }
        function selectedSectionListFn(){
            return selectedSectionList

        }
        function getnewSectionListDefault() {
            return newSectionListDefault;
        }
        function setNewSection(section){
            var convertProperSection = defaultSectionPropAdd(section)
            sectionList.push(convertProperSection)
        }
        function defaultSectionPropAdd(section){
            var res = {}
            for(var prop in defaultSectionProp){
                if(defaultSectionProp.hasOwnProperty(prop)){
                        switch(prop){
                            case 'id': res[prop] = idcnt++;break;
                            case 'sectionName' : res[prop] = section[prop]; break;
                            case 'position' : res[prop] = section.order.alias; break;
                            case 'relativeSection': res[prop] = section.section.alias;break
                            default :
                                if (typeof defaultSectionProp[prop] !=="object") res[prop] = '' ;
                                else{
                                    res[prop] = []
                                    defaultSectionProp[prop].forEach(function(opearation){
                                        res[prop].push(opearation)
                                    })

                                }
                                break;
                        }
                }
            }
            $log.debug(res)
            return res
        }
    }

})();
