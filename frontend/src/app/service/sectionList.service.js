(function() {
    'use strict';

    angular
        .module('frontend')
        .service('SectionListService', SectionListService);
    SectionListService.$inject = []

    /** @ngInject */
    function SectionListService() {
        var availableOrderPosition =  {
            above:{id: '0', name: "above", alias: "Above"},
            down:{id: '1', name: "down", alias: "Down"}
        }


        var availableRelativeSection = {
            BIODATA:{id: '0', name: "BIODATA", alias: "BIODATA"},
            EDUCATION:{id: '0', name: "EDUCATION", alias: "EDUCATION"}
        }


        var sectionList = [

            {
                id:1,
                sectionName:'BIODATA',
                description: 'HTML enhanced for web apps!',
                logo: 'angular.png',
                position:{id: '0', name: "above", alias: "Above"},
                relativeSection: {id: '1', name: "edu", alias: "EDUCATION"},
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
                position:{id: '1', name: "down", alias: "Down"},
                relativeSection:{id: '0', name: "bio", alias: "BIODATA"},
                OrderIndex:1,
                headerSectionOpeartion:[{operation:'default'}],
                fieldOperation:['add-field','create field group'],
                field:[
                    {field1:{id:5,name:'profile'}},
                    {field2:{id:6,name:'signup'}}
                ]
            }
        ];
        window.sectionList = sectionList
        this.getAvailableRelativeSection = getAvailableRelativeSection;
        this.getavailableOrderPosition = getavailableOrderPosition
        this.organizeList = organizeList
        this.getSectionList = getSectionList
        this.arrayDataInOrder = arrayDataInOrder
        /**
         * this function return all availbale section data
         * it will query the data base and return the json
         * @returns {*[]}
         */
        function getSectionList() {
            // arrayDataInOrder()
            return sectionList;
        }

        function getAvailableRelativeSection(){
            return availableRelativeSection;
        }
        function getavailableOrderPosition(){
            return availableOrderPosition;
        }


        /**
         * sort the data when we want to appear same section continous
         */
        function arrayDataInOrder() {
            sectionList.sort(relativeSectionOrder)

            console.log(sectionList)
        }
        function relativeSectionOrder(section1,section2){
            var res = -1;
            if(section1.sectionName == section2.sectionName)
                res =  -1;
            else if(section1.sectionName== section2.relativeSection.alias){
                if(section1.position.name=="down")
                    res = +1;
                else
                    res = -1;
            }
            console.log("sort^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^",section1,section2,res)
            return res
        }


        /**find the index where we have to insert
         * @param obj
         * @param list
         */
        function findIndexOFNewSection(obj,list){
            var index = 0;
            if(list.length==1){
                 index = (obj.position.name=='above')?0:1
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

        /**
         * insert new section object according to its position change another object position in list
         * @param newsection
         */
        function organizeList(newsection,isaddSection){
            //find the index where we have to insert
            var index = findIndexOFNewSection(newsection,sectionList);
            var defaultIntialOjectIndex
            var i
            switch(index){
                case 0:
                    newsection.position=availableOrderPosition.above;
                    newsection.relativeSection =  availableRelativeSection[sectionList[0].sectionName]
                    break;
                case sectionList.length:
                    newsection.position=availableOrderPosition.down;
                     newsection.relativeSection =  availableRelativeSection[sectionList[sectionList.length-1].sectionName]
                    break
                default:
                    i = index-1
                    //we have to insert below to someone------ may be two change -- based on condition
                     if(newsection.position.name=="down"){
                        //change both
                        if((sectionList[i].position.name=="above") &&(sectionList[i+1].position.name=="down") ){
                            sectionList[i].relativeSection = availableRelativeSection[newsection.sectionName]
                            sectionList[i+1].relativeSection = availableRelativeSection[newsection.sectionName]
                        }
                        else if((sectionList[i].position.name=="above"))
                            sectionList[i].relativeSection = availableRelativeSection[newsection.sectionName]
                        else if(sectionList[i+1].position.name=="down")
                            sectionList[i+1].relativeSection = availableRelativeSection[newsection.sectionName]
                    }
            //we have to insert above to someone------ may be two change -- based on condition
                    else{
                        if((sectionList[i].position.name=="above") &&(sectionList[i-1].position.name=="down") ){
                            sectionList[i].relativeSection = availableRelativeSection[newsection.sectionName]
                            sectionList[i-1].relativeSection = availableRelativeSection[newsection.sectionName]
                        }
                        else if((sectionList[i].position.name=="above"))
                            sectionList[i].relativeSection = availableRelativeSection[newsection.sectionName]
                        else if((sectionList[i-1].position.name=="down"))
                            sectionList[i-1].relativeSection = availableRelativeSection[newsection.sectionName]
                    }
            break
            }
            if(isaddSection){
                var tempArray = []
                switch(index){
                    case 0:sectionList.unshift(newsection);break;
                    case sectionList.length: sectionList.push(newsection);break;
                    default:
                        for(var j=0;j<index;j++) {
                            tempArray.push(sectionList[j])
                        }
                        tempArray.push(newsection)
                        for(j=index;j<sectionList.length;j++) {
                            tempArray.push(sectionList[j])
                        }
                        sectionList =  JSON.parse(JSON.stringify(tempArray))
                        break;
                }
            }

        }


    }

})();
