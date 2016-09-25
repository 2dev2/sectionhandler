(function() {
    'use strict';

    angular
        .module('frontend')
        .service('SectionAddService', SectionAddService);
    SectionAddService.$inject = ['$log','SectionListService']

    /** @ngInject */
    function SectionAddService($log,SectionListService) {
        var idcnt = 3
        var defaultSectionProp = {id:'',sectionName:'',position:'',relativeSection:'',OrderIndex:'',headerSectionOpeartion:['edit','delete','move'],fieldOperation:[],field:[]}
        var selectedSectionList = [
            {id: '0', name: "bio", alias: "bio"},
            {id: '1', name: "edu",alias: "edu"}
        ]
        this.setNewSection = setNewSection
        function setNewSection(section){
            var convertProperSection = defaultSectionPropAdd(section)
            SectionListService.getSectionList().push(convertProperSection)
        }

        function defaultSectionPropAdd(section){
            var res = {}
            for(var prop in defaultSectionProp){
                if(defaultSectionProp.hasOwnProperty(prop)){
                    switch(prop){
                        case 'id': res[prop] = idcnt++;break;
                        case 'sectionName' : res[prop] = section[prop]; break;
                        case 'position' : res[prop] = section.order; break;
                        case 'relativeSection': res[prop] = section.section;break
                        default :
                            if (typeof defaultSectionProp[prop] !=="object") res[prop] = '' ;
                            else{
                                res[prop] = []
                                defaultSectionProp[prop].forEach(function(opearation1){
                                    if(prop=='headerSectionOpeartion'){
                                        var obj = {}
                                        obj.operation = opearation1
                                        res[prop].push(obj)
                                    }else {
                                        res[prop].push(opearation1)
                                    }
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
