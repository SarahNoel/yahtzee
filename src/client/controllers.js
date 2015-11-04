app.controller('RollController', ['$scope', '$location', '$rootScope', 'RollServices', 'LoginServices', function($scope, $location, $rootScope, RollServices, LoginServices){

  var turnRolls = 0;
  var gameTurns = 0;
  var hand;
  var numToRoll = 5;
  var heldDice = [];
  var bonus;
  var playerYahtzees = 0;

  $scope.scoreObj = {};
  $scope.noScore = true;
  $scope.scoreObj.upperTotal = 0;
  $scope.scoreObj.lowerTotal = 0;
  $scope.grandTotal = 0;
  $scope.showLogin = true;
  $scope.registerForm = {};
  $scope.loginForm = {};

  $scope.isActive = function (viewLocation) {
    return viewLocation === $location.path();
  };

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
      bonus = checkYahtzee();
      $scope.scoreObj.oneScore = onesScore + bonus;
      $scope.scoreObj.upperTotal += onesScore + bonus;
      confirmScore();
    }
  };

  $scope.scoreTwos = function(){
    combineArrays();
    if($scope.twoScore === undefined && hand !== undefined){
      var twosScore = RollServices.score(hand, 2);
      bonus = checkYahtzee();
      $scope.scoreObj.twoScore = twosScore + bonus;
      $scope.scoreObj.upperTotal += twosScore + bonus;
      confirmScore();
    }
  };

  $scope.scoreThrees = function(){
    combineArrays();
    if($scope.threeScore === undefined && hand !== undefined){
      var threesScore = RollServices.score(hand, 3);
      bonus = checkYahtzee();
      $scope.scoreObj.threeScore = threesScore + bonus;
      $scope.scoreObj.upperTotal += threesScore + bonus;
      confirmScore();
    }
  };

  $scope.scoreFours = function(){
    combineArrays();
    if($scope.fourScore === undefined && hand !== undefined){
      var foursScore = RollServices.score(hand, 4);
      bonus = checkYahtzee();
      $scope.scoreObj.fourScore = foursScore + bonus;
      $scope.scoreObj.upperTotal += foursScore + bonus;
      confirmScore();
    }
  };

  $scope.scoreFives = function(){
    combineArrays();
    if($scope.fiveScore === undefined && hand !== undefined){
      var fivesScore = RollServices.score(hand, 5);
      bonus = checkYahtzee();
      $scope.scoreObj.fiveScore = fivesScore + bonus;
      $scope.scoreObj.upperTotal += fivesScore + bonus;
      confirmScore();
    }
  };

  $scope.scoreSixes = function(){
    combineArrays();
    if($scope.sixScore === undefined && hand !== undefined){
      var sixesScore = RollServices.score(hand, 6);
      bonus = checkYahtzee();
      $scope.scoreObj.sixScore = sixesScore + bonus;
      $scope.scoreObj.upperTotal += sixesScore + bonus;
      confirmScore();
    }
  };

  //lower total functions

  $scope.scoreChance = function(){
    combineArrays();
    if($scope.chance === undefined && hand !== undefined){
      var chanceTotal = RollServices.chance(hand);
      bonus = checkYahtzee();
      $scope.scoreObj.chance = chanceTotal + bonus;
      $scope.scoreObj.lowerTotal += chanceTotal + bonus;
      confirmScore();
    }
  };

   $scope.scoreYahtzee = function(){
    combineArrays();
    if($scope.scoreObj.yahtzee === undefined && hand !== undefined){
      var yahtzee = RollServices.yahtzee(hand);
      if(yahtzee !== 0){
        playerYahtzees++;
        $scope.yahtzeed = true;
      }
      $scope.scoreObj.yahtzee = yahtzee;
      $scope.scoreObj.lowerTotal += yahtzee;
      confirmScore();
    }
  };

  $scope.scoreLrg = function(){
    combineArrays();
    var lrg = RollServices.lrgStraight(hand);
    bonus = checkYahtzee();
    $scope.scoreObj.largeStraight = lrg + bonus;
    $scope.scoreObj.lowerTotal += lrg + bonus;
    confirmScore();
  };

  $scope.scoreSml = function(){
    combineArrays();
    var sml = RollServices.smlStraight(hand);
    bonus = checkYahtzee();
    $scope.scoreObj.smallStraight = sml + bonus;
    $scope.scoreObj.lowerTotal += sml + bonus;
    confirmScore();
  };

  $scope.scoreHouse = function(){
    combineArrays();
    var house = RollServices.fullHouse(hand);
    bonus = checkYahtzee();
    $scope.scoreObj.fullHouse = house + bonus;
    $scope.scoreObj.lowerTotal += house + bonus;
    confirmScore();
  };

  $scope.scoreThreeKind = function(){
    combineArrays();
    var three = RollServices.threeKind(hand);
    bonus = checkYahtzee();
    $scope.scoreObj.threeKind = three + bonus;
    $scope.scoreObj.lowerTotal += three + bonus;
    confirmScore();
  };

  $scope.scoreFourKind = function(){
    combineArrays();
    var four = RollServices.fourKind(hand);
    bonus = checkYahtzee();
    $scope.scoreObj.fourKind = four + bonus;
    $scope.scoreObj.lowerTotal += four + bonus;
    confirmScore();
  };


  function checkBonus(){
    combineArrays();
    if($scope.scoreObj.upperTotal >= 63 && $scope.upperBonus != 35){
      $scope.upperBonus = 35;
      $scope.scoreObj.upperTotal += 35;
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
      $scope.yahtzeed = false;
      console.log($scope.showUser);
      if($scope.showUser !== undefined){
        var sendData = {};
        var grandTotal = ($scope.scoreObj.upperTotal + $scope.scoreObj.lowerTotal);
        var gamesPlayed = ($scope.showUser.gamesPlayed+= 1);
        var points = ($scope.showUser.pointsScored + grandTotal);
        if(grandTotal > $scope.showUser.highScore){
          sendData.highScore = grandTotal;
        }
        sendData.gamesPlayed = gamesPlayed;
        sendData.pointsScored = points;
        sendData.yahtzees = playerYahtzees;
        LoginServices.update(sendData)
        .then(function(data){
          $rootScope.userid = data.user._id;
          $rootScope.user = data.user;
          $scope.showUser = data.user;
        });
      }
    }
  }

  $scope.logout = function(){
    LoginServices.logout().
    then(function(){
      $location.path('/loginpage');
    });
  };

  //register User
  $scope.register = function () {
    // initial values
    $scope.error = false;
    // call register from service
    LoginServices.register($scope.registerForm.username, $scope.registerForm.password)
      .then(function(data){
        $rootScope.user = data.user;
        $scope.showUser = data.user;
        $location.path('/play');
        $scope.registerForm = {};
    }).catch(function (data){
        $scope.registerForm = {};
        $scope.error = true;
        $scope.errorMessage = data.err.message;
      });
    };

    //user login
    $scope.login = function () {
      $scope.error = false;
      $scope.disabled = true;

      // call login from service
      LoginServices.login($scope.loginForm.username, $scope.loginForm.password)
        // handle success
        .then(function (data) {
          $rootScope.userid = data.user._id;
          $rootScope.user = data.user;
          $scope.showUser = data.user;
          $location.path('/play');
          $scope.loginForm = {};
        })
        // handle error
        .catch(function (err) {
          console.log(err);
          $scope.error = true;
          $scope.errorMessage = "Invalid username and/or password";
          $scope.disabled = false;
          $scope.loginForm = {};
        });
      };

      $scope.reset = function(){
        $scope.yahtzeed = $scope.gameOver = $scope.rolled = $scope.rollMax = false;
        $scope.noScore = true;
        $scope.dice = $scope.heldDice = $scope.upperBonus = '';
        hand = undefined;
        turnRolls = 0;
        gameTurns = 0;
        heldDice = [];
        numToRoll = 5;
        $scope.scoreObj = {};
        $scope.scoreObj.lowerTotal = $scope.scoreObj.upperTotal = 0;
      };

      $scope.isLoggedIn= function(){
        return LoginServices.isLoggedIn();
      };

      function checkYahtzee(){
        var yaht = RollServices.yahtzee(hand);
        if(yaht === 50 && $scope.yahtzee !== ''){
          playerYahtzees++;
          return 50;
        }
        else{
          return 0;
        }
      }


}]);


app.controller('PvPController', ['$scope', '$location', '$rootScope', 'RollServices', function($scope, $location, $rootScope, RollServices){
  $scope.player1 = true;
  var turnRolls = 0;
  var gameTurns = 0;
  var hand;
  var numToRoll = 5;
  var heldDice = [];
  var bonus;

  $scope.scoreObj = {};
  $scope.p1Scores = {};
  $scope.p2Scores = {};
  $scope.noScore = true;
  $scope.p1Scores.upperTotal = 0;
  $scope.p1Scores.lowerTotal = 0;
  $scope.scoreObj.upperTotal = 0;
  $scope.scoreObj.lowerTotal = 0;
  $scope.grandTotal = 0;
  $scope.p2Scores.upperTotal = 0;
  $scope.p2Scores.lowerTotal = 0;

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
      bonus = checkYahtzee();
      $scope.scoreObj.oneScore = onesScore + bonus;
      $scope.scoreObj.upperTotal += onesScore + bonus;
      confirmScore();
    }
  };

  $scope.scoreTwos = function(){
    combineArrays();
    if($scope.twoScore === undefined && hand !== undefined){
      var twosScore = RollServices.score(hand, 2);
      bonus = checkYahtzee();
      $scope.scoreObj.twoScore = twosScore + bonus;
      $scope.scoreObj.upperTotal += twosScore + bonus;
      confirmScore();
    }
  };

  $scope.scoreThrees = function(){
    combineArrays();
    if($scope.threeScore === undefined && hand !== undefined){
      var threesScore = RollServices.score(hand, 3);
      bonus = checkYahtzee();
      $scope.scoreObj.threeScore = threesScore + bonus;
      $scope.scoreObj.upperTotal += threesScore + bonus;
      confirmScore();
    }
  };

  $scope.scoreFours = function(){
    combineArrays();
    if($scope.fourScore === undefined && hand !== undefined){
      var foursScore = RollServices.score(hand, 4);
      bonus = checkYahtzee();
      $scope.scoreObj.fourScore = foursScore + bonus;
      $scope.scoreObj.upperTotal += foursScore + bonus;
      confirmScore();
    }
  };

  $scope.scoreFives = function(){
    combineArrays();
    if($scope.fiveScore === undefined && hand !== undefined){
      var fivesScore = RollServices.score(hand, 5);
      bonus = checkYahtzee();
      $scope.scoreObj.fiveScore = fivesScore + bonus;
      $scope.scoreObj.upperTotal += fivesScore + bonus;
      confirmScore();
    }
  };

  $scope.scoreSixes = function(){
    combineArrays();
    if($scope.sixScore === undefined && hand !== undefined){
      var sixesScore = RollServices.score(hand, 6);
      bonus = checkYahtzee();
      $scope.scoreObj.sixScore = sixesScore + bonus;
      $scope.scoreObj.upperTotal += sixesScore + bonus;
      confirmScore();
    }
  };

  //lower total functions

  $scope.scoreChance = function(){
    combineArrays();
    if($scope.chance === undefined && hand !== undefined){
      var chanceTotal = RollServices.chance(hand);
      bonus = checkYahtzee();
      $scope.scoreObj.chance = chanceTotal + bonus;
      $scope.scoreObj.lowerTotal += chanceTotal + bonus;
      confirmScore();
    }
  };

   $scope.scoreYahtzee = function(){
    combineArrays();
    if($scope.scoreObj.yahtzee === undefined && hand !== undefined){
      var yahtzee = RollServices.yahtzee(hand);
      if(yahtzee !== 0){
        $scope.scoreObj.yahtzeed = true;
      }
      $scope.scoreObj.yahtzee = yahtzee;
      $scope.scoreObj.lowerTotal += yahtzee;
      confirmScore();
    }
  };

  $scope.scoreLrg = function(){
    combineArrays();
    var lrg = RollServices.lrgStraight(hand);
    bonus = checkYahtzee();
    $scope.scoreObj.largeStraight = lrg + bonus;
    $scope.scoreObj.lowerTotal += lrg + bonus;
    confirmScore();
  };

  $scope.scoreSml = function(){
    combineArrays();
    var sml = RollServices.smlStraight(hand);
    bonus = checkYahtzee();
    $scope.scoreObj.smallStraight = sml + bonus;
    $scope.scoreObj.lowerTotal += sml + bonus;
    confirmScore();
  };

  $scope.scoreHouse = function(){
    combineArrays();
    var house = RollServices.fullHouse(hand);
    bonus = checkYahtzee();
    $scope.scoreObj.fullHouse = house + bonus;
    $scope.scoreObj.lowerTotal += house + bonus;
    confirmScore();
  };

  $scope.scoreThreeKind = function(){
    combineArrays();
    var three = RollServices.threeKind(hand);
    bonus = checkYahtzee();
    $scope.scoreObj.threeKind = three + bonus;
    $scope.scoreObj.lowerTotal += three + bonus;
    confirmScore();
  };

  $scope.scoreFourKind = function(){
    combineArrays();
    var four = RollServices.fourKind(hand);
    bonus = checkYahtzee();
    $scope.scoreObj.fourKind = four + bonus;
    $scope.scoreObj.lowerTotal += four + bonus;
    confirmScore();
  };


  function checkBonus(){
    combineArrays();
    if($scope.scoreObj.upperTotal >= 63 && $scope.upperBonus != 35){
      $scope.upperBonus = 35;
      $scope.scoreObj.upperTotal += 35;
    }
  }

  function confirmScore (){
    $scope.noScore = true;
    checkBonus();
    $scope.rolled = $scope.rollMax = false;
    $scope.dice = $scope.heldDice = '';
    hand = undefined;
    turnRolls = 0;
    gameTurns++;
    heldDice = [];
    numToRoll = 5;
    $scope.turnOver = true;

  }

  $scope.passPlay = function () {
    $scope.turnOver = false;
    if($scope.player1){
      $scope.p1Scores = $scope.scoreObj;
      $scope.scoreObj = $scope.p2Scores;
      $scope.player1 = false;
    }
    else{
      $scope.p2Scores = $scope.scoreObj;
      $scope.scoreObj = $scope.p1Scores;
      $scope.player1 = true;
    }
    if(gameTurns >= 26){
      $scope.pvpGameOver = true;
      $scope.p1Scores.yahtzeed = $scope.p2Scores.yahtzeed= false;
      if($scope.p1Scores.upperTotal + $scope.p1Scores.lowerTotal > $scope.p2Scores.upperTotal + $scope.p2Scores.lowerTotal){
        $scope.winnerName = $scope.playerName.p1Name + " Wins!";
      }else if($scope.p1Scores.upperTotal + $scope.p1Scores.lowerTotal < $scope.p2Scores.upperTotal + $scope.p2Scores.lowerTotal){
        $scope.winnerName = $scope.playerName.p2Name + " Wins!";
      }else{
        $scope.winnerName = "No way!  It's a tie!";
      }
    }
  };

  $scope.reset = function(){
    $scope.pvpGameOver = $scope.scoreObj.yahtzeed = $scope.rolled = $scope.rollMax = $scope.turnOver =  false;
    $scope.noScore = $scope.player1 = true;
    $scope.dice = $scope.heldDice = $scope.upperBonus = '';
    hand = undefined;
    turnRolls = 0;
    gameTurns = 0;
    heldDice = [];
    numToRoll = 5;
    $scope.p1Scores = $scope.scoreObj = {};
    $scope.p2Scores = {};
    $scope.p1Scores.upperTotal = $scope.p2Scores.upperTotal = $scope.p1Scores.lowerTotal = $scope.p2Scores.lowerTotal = $scope.scoreObj.lowerTotal = $scope.scoreObj.upperTotal = 0;
    $scope.scoreObj = $scope.p1Scores;
  };

  $scope.changeNames = function(){
    $scope.playerName = {};
    $scope.playersPicked = false;
  };

  function checkYahtzee(){
      var yaht = RollServices.yahtzee(hand);
      if(yaht === 50 && $scope.yahtzee !== ''){
        return 50;
      }
      else{
        return 0;
      }
    }
}]);
