(function() {
    'use strict';

    angular
        .module('frontend')
        .service('SectionEditService', SectionEditService);
    SectionEditService.$inject = ['$log','SectionListService']

    /** @ngInject */
    function SectionEditService($log,SectionListService) {
        var idcnt = 3
        var defaultSectionProp = {id:'',sectionName:'',position:'',relativeSection:'',OrderIndex:'',headerSectionOpeartion:['edit','delete','move'],fieldOperation:[],field:[]}
        var selectedSectionList = [
            {id: '0', name: "bio", alias: "bio"},
            {id: '1', name: "edu",alias: "edu"}
        ]
        this.editSection = editSection
        function editSection(section){
            var list = SectionListService.getSectionList()
            // var convertProperSection = defaultSectionPropAdd(section)
            var index = findPosition(section,list)
            var organizedList = removefromList(index,list)
            console.log(section)
            // SectionListService.addInList(modifiedList,section,index)
            // SectionAddService.addInList(organizedList,section,index)
            // SectionListService.getSectionList().push(convertProperSection)
        }



        function removefromList(index,list){
            var availableRelative = SectionListService.getAvailableRelativeSection()
            switch (index){
                case 0:break;
                case list.size-1: break;
                default:
                    if((list[i-1].position.name=="below") && (list[i+1].position.name=="above")){
                        list[i-1].relativeSection = availableRelative[list[i+1].sectionName]
                        list[i+1].relativeSection = availableRelative[list[i-1].sectionName]
                    }
                    else if (list[i-1].position.name=="below"){
                        list[i-1].relativeSection = availableRelative[list[i+1].sectionName]

                    }
                    else if (list[i+1].position.name=="above"){
                        list[i+1].relativeSection = availableRelative[list[i-1].sectionName]
                    }
            }
            return list;

        }

        function findPosition(editsection,list){
            var index = 0;
            list.forEach(function(section,i){
                if(editsection.items.sectionName==editsection.sectionName)
                    index = i
            })
            return index;
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
