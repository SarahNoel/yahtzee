app.controller('RollController', ['$scope', '$location', '$rootScope', 'RollServices', 'LoginServices', function($scope, $location, $rootScope, RollServices, LoginServices){

  var turnRolls = 0;
  var gameTurns = 0;
  var hand;
  var numToRoll = 5;
  var heldDice = [];
  var bonus;

  $scope.upper = {};
  $scope.lower = {};
  $scope.noScore = true;
  $scope.upperTotal = 0;
  $scope.lowerTotal = 0;
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
      $scope.upper.oneScore = onesScore + bonus;
      $scope.upperTotal += onesScore + bonus;
      confirmScore();
    }
  };

  $scope.scoreTwos = function(){
    combineArrays();
    if($scope.twoScore === undefined && hand !== undefined){
      var twosScore = RollServices.score(hand, 2);
      bonus = checkYahtzee();
      $scope.upper.twoScore = twosScore + bonus;
      $scope.upperTotal += twosScore + bonus;
      confirmScore();
    }
  };

  $scope.scoreThrees = function(){
    combineArrays();
    if($scope.threeScore === undefined && hand !== undefined){
      var threesScore = RollServices.score(hand, 3);
      bonus = checkYahtzee();
      $scope.upper.threeScore = threesScore + bonus;
      $scope.upperTotal += threesScore + bonus;
      confirmScore();
    }
  };

  $scope.scoreFours = function(){
    combineArrays();
    if($scope.fourScore === undefined && hand !== undefined){
      var foursScore = RollServices.score(hand, 4);
      bonus = checkYahtzee();
      $scope.upper.fourScore = foursScore + bonus;
      $scope.upperTotal += foursScore + bonus;
      confirmScore();
    }
  };

  $scope.scoreFives = function(){
    combineArrays();
    if($scope.fiveScore === undefined && hand !== undefined){
      var fivesScore = RollServices.score(hand, 5);
      bonus = checkYahtzee();
      $scope.upper.fiveScore = fivesScore + bonus;
      $scope.upperTotal += fivesScore + bonus;
      confirmScore();
    }
  };

  $scope.scoreSixes = function(){
    combineArrays();
    if($scope.sixScore === undefined && hand !== undefined){
      var sixesScore = RollServices.score(hand, 6);
      bonus = checkYahtzee();
      $scope.upper.sixScore = sixesScore + bonus;
      $scope.upperTotal += sixesScore + bonus;
      confirmScore();
    }
  };

  //lower total functions

  $scope.scoreChance = function(){
    combineArrays();
    if($scope.chance === undefined && hand !== undefined){
      var chanceTotal = RollServices.chance(hand);
      bonus = checkYahtzee();
      $scope.lower.chance = chanceTotal + bonus;
      $scope.lowerTotal += chanceTotal + bonus;
      confirmScore();
    }
  };

   $scope.scoreYahtzee = function(){
    combineArrays();
    if($scope.yahtzee === undefined && hand !== undefined){
      var yahtzee = RollServices.yahtzee(hand);
      $scope.lower.yahtzee = yahtzee;
      $scope.lowerTotal += yahtzee;
      confirmScore();
    }
  };

  $scope.scoreLrg = function(){
    combineArrays();
    var lrg = RollServices.lrgStraight(hand);
    bonus = checkYahtzee();
    $scope.lower.largeStraight = lrg + bonus;
    $scope.lowerTotal += lrg + bonus;
    confirmScore();
  };

  $scope.scoreSml = function(){
    combineArrays();
    var sml = RollServices.smlStraight(hand);
    bonus = checkYahtzee();
    $scope.lower.smallStraight = sml + bonus;
    $scope.lowerTotal += sml + bonus;
    confirmScore();
  };

  $scope.scoreHouse = function(){
    combineArrays();
    var house = RollServices.fullHouse(hand);
    bonus = checkYahtzee();
    $scope.lower.fullHouse = house + bonus;
    $scope.lowerTotal += house + bonus;
    confirmScore();
  };

  $scope.scoreThreeKind = function(){
    combineArrays();
    var three = RollServices.threeKind(hand);
    bonus = checkYahtzee();
    $scope.lower.threeKind = three + bonus;
    $scope.lowerTotal += three + bonus;
    confirmScore();
  };

  $scope.scoreFourKind = function(){
    combineArrays();
    var four = RollServices.fourKind(hand);
    bonus = checkYahtzee();
    $scope.lower.fourKind = four + bonus;
    $scope.lowerTotal += four + bonus;
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
      if($scope.showUser !== undefined){
        var grandTotal = ($scope.upperTotal + $scope.lowerTotal);
        var gamesPlayed = ($scope.showUser.gamesPlayed +=1);
        if(grandTotal > $scope.showUser.highScore){
          LoginServices.update({gamesPlayed:gamesPlayed, highScore:grandTotal})
          .then(function(data){
            $rootScope.userid = data.user._id;
            $rootScope.user = data.user;
            $scope.showUser = data.user;
          });
        }
        else{
          LoginServices.update({gamesPlayed:gamesPlayed})
          .then(function(data){
            $rootScope.userid = data.user._id;
            $rootScope.user = data.user;
            $scope.showUser = data.user;
          });
        }
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
        $rootScope.userid = data.user._id;
        $scope.showUser = data.user.username;
        $rootScope.user = data.user;
        $scope.showUser = data.user;
        $scope.registering = false;
        $location.path('/');
    }).catch(function (data){
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
          $location.path('/');
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
        $scope.gameOver = $scope.rolled = $scope.rollMax = false;
        $scope.noScore = true;
        $scope.dice = $scope.heldDice = $scope.upperBonus = '';
        hand = undefined;
        turnRolls = 0;
        gameTurns = 0;
        heldDice = [];
        numToRoll = 5;
        $scope.lower = $scope.upper = {};
        $scope.lowerTotal = $scope.upperTotal = 0;
      };

      $scope.isLoggedIn= function(){
        return LoginServices.isLoggedIn();
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







