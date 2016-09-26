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
        this.setNewSection = setNewSection
        function setNewSection(section){

            var convertProperSection = defaultSectionPropAdd(section)
            convertAddInAvailableRelativeSection(convertProperSection)
            SectionListService.organizeList(convertProperSection,true)
            
            // SectionListService.getSectionList().push(convertProperSection)



        }


        function convertAddInAvailableRelativeSection(obj){
            var sectionName = obj.sectionName
            var listObj = SectionListService.getAvailableRelativeSection()
            if(listObj.hasOwnProperty(sectionName))
                return;
            var res = {}
             res.id = 0
            res.name = sectionName
            res.alias = sectionName

            listObj[sectionName] = res;
            // listObj.cnt = listObj.cnt+1;
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
