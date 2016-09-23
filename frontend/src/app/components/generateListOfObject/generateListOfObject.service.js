(function() {
  'use strict';

  angular
      .module('frontend')
      .service('generateListOfObject', generateListOfObject);

  /** @ngInject */
  function generateListOfObject() {
    var vm = this;
    var numberOfObject
    var matrix,row
    vm.generateMatrix = function (rowPassed){
      numberOfObject = rowPassed
    row = []
    for(var i =0;i<rowPassed;i++)
      row.push(i)
    matrix = row.map(function(d){
              return row.map(function(column){
                //here write a cell constructor function and call new Cell()
                return {
                  color:'old',
                  // background:'grey',
                  row:d,
                  col:column
                }
              })
    })
    return matrix
    }

    vm.getMatrix = function(){
      return matrix
    }

    vm.getRow= function(){
      return row;
    }

    vm.modifyCell = function(obj){
      matrix[obj.row][obj.col].color = 'new'
    }


  }
})();
