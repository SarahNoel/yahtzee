app.controller('RollController', ['$scope', 'RollServices', function($scope, RollServices){

  $scope.noScore = true;
  $scope.upperTotal = 0;
  $scope.lowerTotal = 0;
  $scope.grandTotal = 0;
  var turnRolls = 0;
  var gameTurns = 0;
  var hand;
  var numToRoll = 5;
  var heldDice = [];

  $scope.roll = function (){
    if(turnRolls >= 2){
      $scope.rollMax = true;
    }
    turnRolls ++;
    $scope.rolled = true;
    var dice = RollServices.roll(numToRoll);
    $scope.dice = dice;
    hand = dice;
    for (var i = 0; i < heldDice.length; i++) {
      hand.splice(0, 0, heldDice[i]);
    }
  };


  $scope.hold = function(die){
    heldDice.push(die);
    numToRoll--;
  };

  //upper total functions
  $scope.scoreOnes = function(){
    if($scope.oneScore === undefined && hand !== undefined){
      $scope.noScore = false;
      var onesScore = RollServices.score(hand, 1);
      $scope.oneScore = onesScore;
      $scope.upperTotal += onesScore;
      confirmScore();
    }
  };

  $scope.scoreTwos = function(){
    if($scope.twoScore === undefined && hand !== undefined){
      var twosScore = RollServices.score(hand, 2);
      $scope.twoScore = twosScore;
      $scope.upperTotal += twosScore;
      confirmScore();
    }
  };

  $scope.scoreThrees = function(){
    if($scope.threeScore === undefined && hand !== undefined){
      var threesScore = RollServices.score(hand, 3);
      $scope.threeScore = threesScore;
      $scope.upperTotal += threesScore;
      confirmScore();
    }
  };

  $scope.scoreFours = function(){
    if($scope.fourScore === undefined && hand !== undefined){
      var foursScore = RollServices.score(hand, 4);
      $scope.fourScore = foursScore;
      $scope.upperTotal += foursScore;
      confirmScore();
    }
  };

  $scope.scoreFives = function(){
    if($scope.fiveScore === undefined && hand !== undefined){
      var fivesScore = RollServices.score(hand, 5);
      $scope.fiveScore = fivesScore;
      $scope.upperTotal += fivesScore;
      confirmScore();
    }
  };

  $scope.scoreSixes = function(){
    if($scope.sixScore === undefined && hand !== undefined){
      var sixesScore = RollServices.score(hand, 6);
      $scope.sixScore = sixesScore;
      $scope.upperTotal += sixesScore;
      confirmScore();
    }
  };

  //lower total functions

  $scope.scoreChance = function(){
    if($scope.chance === undefined && hand !== undefined){
      var chanceTotal = RollServices.chance(hand);
      $scope.chance = chanceTotal;
      $scope.lowerTotal += chanceTotal;
      confirmScore();
    }
  };

   $scope.scoreYahtzee = function(){
    if($scope.yahtzee === undefined && hand !== undefined){
      var yahtzee = RollServices.yahtzee(hand);
      $scope.yahtzee = yahtzee;
      $scope.lowerTotal += yahtzee;
      confirmScore();
    }
  };

  $scope.scoreLrg = function(){
    var lrg = RollServices.lrgStraight(hand);
    $scope.largeStraight = lrg;
    $scope.lowerTotal += lrg;
    confirmScore();
  };

  $scope.scoreSml = function(){
    var sml = RollServices.smlStraight(hand);
    $scope.smallStraight = sml;
    $scope.lowerTotal += sml;
    confirmScore();
  };

  $scope.scoreHouse = function(){
    var house = RollServices.fullHouse(hand);
    $scope.fullHouse = house;
    $scope.lowerTotal += house;
    confirmScore();
  };

  $scope.scoreThreeKind = function(){
    var three = RollServices.threeKind(hand);
    $scope.threeKind = three;
    $scope.lowerTotal += three;
    confirmScore();
  };

  $scope.scoreFourKind = function(){
    var four = RollServices.fourKind(hand);
    $scope.fourKind = four;
    $scope.lowerTotal += four;
    confirmScore();
  };


  function checkBonus(){
    if($scope.upperTotal >= 63 && $scope.upperBonus != 35){
      $scope.upperBonus = 35;
      $scope.upperTotal += 35;
    }
  }


  function confirmScore (){
    checkBonus();
    $scope.rolled = $scope.rollMax = false;
    $scope.noScore = true;
    $scope.dice = '';
    hand = undefined;
    turnRolls = 0;
    gameTurns++;
    heldDice = [];
    numToRoll = 5;
    if(gameTurns >= 13){
      alert("GAME OVER MAN");
    }
  }


}]);







