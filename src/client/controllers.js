app.controller('RollController', ['$scope', 'RollServices', function($scope, RollServices){

  var turnRolls = 0;
  var gameTurns = 0;
  var hand;
  var numToRoll = 5;
  var heldDice = [];

  $scope.noScore = true;
  $scope.upperTotal = 0;
  $scope.lowerTotal = 0;
  $scope.grandTotal = 0;

  function combineArrays(){
    for (var i = 0; i < heldDice.length; i++) {
      hand.push(heldDice[i]);
    }
  }

  $scope.roll = function (){
    if(turnRolls >= 2){
      $scope.rollMax = true;
    }
    turnRolls ++;
    $scope.rolled = true;
    var dice = RollServices.roll(numToRoll);
    $scope.dice = dice;
    hand = dice;
  };

  $scope.hold = function(die, index){
    heldDice.push(die);
    hand.splice(index, 1);
    numToRoll--;
    $scope.heldDice = heldDice;
  };

  $scope.unhold = function(die, index){
    hand.push(die);
    heldDice.splice(index, 1);
    numToRoll++;
  };


  //upper total functions
  $scope.scoreOnes = function(){
    combineArrays();
    if($scope.oneScore === undefined && hand !== undefined){
      $scope.noScore = false;
      var onesScore = RollServices.score(hand, 1);
      $scope.oneScore = onesScore;
      $scope.upperTotal += onesScore;
      confirmScore();
    }
  };

  $scope.scoreTwos = function(){
    combineArrays();
    if($scope.twoScore === undefined && hand !== undefined){
      var twosScore = RollServices.score(hand, 2);
      $scope.twoScore = twosScore;
      $scope.upperTotal += twosScore;
      confirmScore();
    }
  };

  $scope.scoreThrees = function(){
    combineArrays();
    if($scope.threeScore === undefined && hand !== undefined){
      var threesScore = RollServices.score(hand, 3);
      $scope.threeScore = threesScore;
      $scope.upperTotal += threesScore;
      confirmScore();
    }
  };

  $scope.scoreFours = function(){
    combineArrays();
    if($scope.fourScore === undefined && hand !== undefined){
      var foursScore = RollServices.score(hand, 4);
      $scope.fourScore = foursScore;
      $scope.upperTotal += foursScore;
      confirmScore();
    }
  };

  $scope.scoreFives = function(){
    combineArrays();
    if($scope.fiveScore === undefined && hand !== undefined){
      var fivesScore = RollServices.score(hand, 5);
      $scope.fiveScore = fivesScore;
      $scope.upperTotal += fivesScore;
      confirmScore();
    }
  };

  $scope.scoreSixes = function(){
    combineArrays();
    if($scope.sixScore === undefined && hand !== undefined){
      var sixesScore = RollServices.score(hand, 6);
      $scope.sixScore = sixesScore;
      $scope.upperTotal += sixesScore;
      confirmScore();
    }
  };

  //lower total functions

  $scope.scoreChance = function(){
    combineArrays();
    if($scope.chance === undefined && hand !== undefined){
      var chanceTotal = RollServices.chance(hand);
      $scope.chance = chanceTotal;
      $scope.lowerTotal += chanceTotal;
      confirmScore();
    }
  };

   $scope.scoreYahtzee = function(){
    combineArrays();
    if($scope.yahtzee === undefined && hand !== undefined){
      var yahtzee = RollServices.yahtzee(hand);
      $scope.yahtzee = yahtzee;
      $scope.lowerTotal += yahtzee;
      confirmScore();
    }
  };

  $scope.scoreLrg = function(){
    combineArrays();
    var lrg = RollServices.lrgStraight(hand);
    $scope.largeStraight = lrg;
    $scope.lowerTotal += lrg;
    confirmScore();
  };

  $scope.scoreSml = function(){
    combineArrays();
    var sml = RollServices.smlStraight(hand);
    $scope.smallStraight = sml;
    $scope.lowerTotal += sml;
    confirmScore();
  };

  $scope.scoreHouse = function(){
    combineArrays();
    var house = RollServices.fullHouse(hand);
    $scope.fullHouse = house;
    $scope.lowerTotal += house;
    confirmScore();
  };

  $scope.scoreThreeKind = function(){
    combineArrays();
    var three = RollServices.threeKind(hand);
    $scope.threeKind = three;
    $scope.lowerTotal += three;
    confirmScore();
  };

  $scope.scoreFourKind = function(){
    combineArrays();
    var four = RollServices.fourKind(hand);
    $scope.fourKind = four;
    $scope.lowerTotal += four;
    confirmScore();
  };


  function checkBonus(){
    combineArrays();
    if($scope.upperTotal >= 63 && $scope.upperBonus != 35){
      $scope.upperBonus = 35;
      $scope.upperTotal += 35;
    }
  }


  function confirmScore (){
    checkBonus();
    $scope.rolled = $scope.rollMax = false;
    $scope.noScore = true;
    $scope.dice = $scope.heldDice = '';
    hand = undefined;
    turnRolls = 0;
    gameTurns++;
    heldDice = [];
    numToRoll = 5;
    if(gameTurns >= 13){
      $scope.gameOver = true;
    }
  }


}]);







