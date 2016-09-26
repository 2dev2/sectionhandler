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
        this.findIndexOFNewSection = findIndexOFNewSection
        function setNewSection(section){
            var list =JSON.parse(JSON.stringify(SectionListService.getSectionList()))
            var convertProperSection = defaultSectionPropAdd(section)
            convertAddInAvailableRelativeSection(convertProperSection)
            var index = findIndexOFNewSection(convertProperSection,list)
            var modifiedList = SectionListService.organizeList(convertProperSection,index,list)
            modifiedList = SectionListService.addInList(modifiedList,convertProperSection,index)
            SectionListService.setSectionList(modifiedList)
            
            // SectionListService.getSectionList().push(convertProperSection)



        }
        /**find the index where we have to insert
         * @param obj
         * @param list
         */
        function findIndexOFNewSection(obj,list){
            var index = 0;
            if(list.length==1){
                index = (obj.position.name=='above')?0:1
                return index;
            }
            for(var i=0;i<list.length;i++){
                if((list[i].sectionName==obj.relativeSection.alias) && (list[i].sectionName!=list[i].relativeSection.alias)){
                    //choose last if down
                    if(obj.position.name=="down") {
                        if ((i == list.length-1) || (list[i + 1].sectionName !=obj.relativeSection.alias)) {
                            index = i+1;
                            break;
                        }
                    }
                    //choose first
                    else{
                        if((i==0)||(list[i-1].sectionName!=obj.relativeSection.alias)){
                            index = i;
                            break;
                        }
                    }
                }

            }
            return index;

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
