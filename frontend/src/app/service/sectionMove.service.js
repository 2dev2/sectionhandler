(function() {
    'use strict';

    angular
        .module('frontend')
        .service('SectionMoveService', SectionMoveService);
    SectionMoveService.$inject = ['$log','SectionListService','SectionAddService']

    /** @ngInject */
    function SectionMoveService($log,SectionListService,SectionAddService) {
        var idcnt = 3
        var defaultSectionProp = {id:'',sectionName:'',position:'',relativeSection:'',OrderIndex:'',headerSectionOpeartion:['edit','delete','move'],fieldOperation:[],field:[]}
        var selectedSectionList = [
            {id: '0', name: "bio", alias: "bio"},
            {id: '1', name: "edu",alias: "edu"}
        ]
        this.editSection = editSection
        function editSection(notFormatedsection){
            var oldsectionName = notFormatedsection.items.sectionName
            var section =JSON.parse(JSON.stringify(notFormatedsection.items)) // notFormatedsection.items
            section.position = notFormatedsection.order
            section.relativeSection = notFormatedsection.section
            section.sectionName = notFormatedsection.sectionName
            convertAddInAvailableRelativeSection(section,oldsectionName)

            var list = SectionListService.getSectionList()
            // var convertProperSection = defaultSectionPropAdd(section)

            //find position delete from there modify the list
            var index = findPosition(section,list)
            var organizedList= removefromList(index,list)



            console.log(organizedList,section)

            //find the correct position insert there
            var findIndexForInsertion = SectionAddService.findIndexOFNewSection(section,organizedList);
            // var findIndexForInsertion = findIndexForInsertionFn(section,organizedList)
            organizedList = SectionListService.addInList(organizedList,section,findIndexForInsertion)
            console.log(organizedList)
            SectionListService.setSectionList(organizedList)
        }

        function convertAddInAvailableRelativeSection(obj,oldName){
            var sectionName = obj.sectionName
            var listObj = SectionListService.getAvailableRelativeSection()
            if(listObj.hasOwnProperty(oldName))
                delete  listObj[oldName];
            var res = {}
            res.id = 0
            res.name = sectionName
            res.alias = sectionName
            listObj[sectionName] = res;
            // changeOldSectionName(sectionName,oldName)
        }

        function changeOldSectionName(newName,oldName){
            var list = SectionListService.getSectionList()
            var listObj = SectionListService.getAvailableRelativeSection()
            list.forEach(function(obj){
                if(obj.sectionName==oldName){
                    obj.sectionName = newName
                }

                if(obj.relativeSection.alias==oldName){
                    obj.relativeSection = listObj[newName]
                }

            })
            SectionListService.setSectionList(list)


        }


        function removefromList(index,list){
            var availableOrderPosition = SectionListService.getavailableOrderPosition()
            var availableRelative = SectionListService.getAvailableRelativeSection()
            switch (index){
                case 0:
                    if(list[1].position.name=="down") {
                        list[1].position = availableOrderPosition['above']
                        if(list.length==2)
                            list[1].relativeSection = availableRelative[list[0].sectionName]
                        else
                            list[1].relativeSection = availableRelative[list[2].sectionName]
                    }
                    //delete first element
                    break;
                case list.length-1:
                    var ind = list.length-2
                    //delete last element
                    if(list[ind].position.name=="above") {
                        list[ind].position = availableOrderPosition['down']
                        if(list.length==2)
                            list[ind].relativeSection = availableRelative[list[ind+1].sectionName]
                        else
                            list[ind].relativeSection = availableRelative[list[ind-1].sectionName]
                    }
                    break
                default:
                    if((list.length>2 )&& (list[i-1].position.name=="above") && (list[i+1].position.name=="down")){
                        list[i-1].relativeSection = availableRelative[list[i+1].sectionName]
                        list[i+1].relativeSection = availableRelative[list[i-1].sectionName]
                    }
                    else if (list[i-1].position.name=="above"){
                        list[i-1].relativeSection = availableRelative[list[i+1].sectionName]

                    }
                    else if (list[i+1].position.name=="down"){
                        list[i+1].relativeSection = availableRelative[list[i-1].sectionName]
                    }
            }
            list.splice(index,1)
            return list;

        }

        function findIndexForInsertionFn(editsection,list){


        }

        function findPosition(editsection,list){
            var index = 0;
            list.forEach(function(section,i){
                if(editsection.sectionName==section.sectionName)
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
