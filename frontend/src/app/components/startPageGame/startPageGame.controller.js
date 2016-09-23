(function() {
  'use strict';

  angular
    .module('frontend')
    .controller('startGameController', startGameController);

  /** @ngInject */
  function startGameController($scope,$timeout, webDevTec,randomNumberGeneration,generateListOfObject,$state,$stateParams) {
     var vm = this;

     var numberOfCountDownSeconds = $stateParams.settings.numberOfCountDownSeconds,
     numberOfRandomCell = $stateParams.settings.numberOfRandomCell,
     numberOfRow = $stateParams.settings.numberOfRow,
     numberOfChances = $stateParams.settings.numberOfChances
     vm.numberOfCountDownSeconds = numberOfCountDownSeconds
    //generate matrix and timer object
    generateListOfObject.generateMatrix(numberOfRow)
    vm.mat = generateListOfObject.getMatrix()
    vm.row = generateListOfObject.getRow()

    vm.timerObject = {timerComplete:false,timer1:{}}
    var predefinedChance = numberOfChances;

    var rand = []
    vm.startGame = function(){
      console.log("timer",vm.timerObject)
     vm.hideResumeButton = false
      //generate random number matrix cell
      if(rand)
        randomNumberGeneration.generateRandomList(numberOfRandomCell,numberOfRow,rand)
      else
        randomNumberGeneration.generateRandomList(numberOfRandomCell,numberOfRow)
      rand = angular.copy(randomNumberGeneration.getList())
      //change randomly generated cell color

      rand.forEach(function(obj){
        generateListOfObject.modifyCell(obj);
      })
      //start timer
      vm.timerObject.timerComplete = false
      vm.timerObject.clickOnStartButton = true;
    }


    vm.resetMatrixCell = function(obj){
      if(predefinedChance==0)
        return;
          obj.color = 'old'
      randomNumberGeneration.modifyCell(obj);
      rand = angular.copy(randomNumberGeneration.getList())
      if((rand && rand.length==0)||(!rand)){
         vm.timerObject.clickOnStartButton = false;
         vm.showStausOfGame = true
         vm.statusOfGame = "You won !"
        $state.go('startGamePage.gameOver')
      }
    }


  
   //if timer complete start event
     $scope.$on('timer-stopped', function (event, data){
        predefinedChance= predefinedChance -1;
        vm.timerObject.timerComplete = true;
        vm.timerObject.clickOnStartButton = false;
        $scope.$digest()
         // console.log('Timer Stopped - data = ', data,event);
        if((rand && rand.length==0)||(!rand)){
          vm.showStausOfGame = true
          $state.go('startGamePage.gameOver')
          // alert("you win the game")
        }
        else if(predefinedChance==0){
          // alert('Sorry  you lose')
          vm.showStausOfGame = true
          vm.statusOfGame = "You lose !"
          $state.go('startGamePage.gameOver')
          // alert('game over')
        }
        else{
          // vm.hideResumeButton = true;
           vm.showStausOfGame = true
          vm.statusOfGame = "Your remaining chance "+ predefinedChance
          if (window.confirm("Do you  want to try again?")) { 
            $state.go('startGamePage.retryGame') 
            vm.startGame()
          }
          else
            $state.go('home')
          
        }
    });



    vm.startGame()

    vm.exitGame=function(){
      $state.go('home')
    }

  }
})();
