app.factory('RollServices', function(){

return{ roll:roll,
        hold:hold,
        score:score,
        chance:chance,
        yahtzee:yahtzee,
        lrgStraight:lrgStraight,
        smlStraight:smlStraight,
        fullHouse:fullHouse,
        threeKind:threeKind,
        fourKind:fourKind
      };

  function roll(numDice){
    var diceFace = [0, '\u2680', '\u2681', '\u2682', '\u2683', '\u2684', '\u2685'];
    var playerHand = [];
    var die = 0;
    for (var i = 0; i < numDice; i++) {
      var rollObj ={};
      die = Math.ceil(Math.random()*6);
      rollObj.value = die;
      rollObj.face = diceFace[die];
      playerHand.push(rollObj);
    }
    return playerHand;
  }

  function score(hand, num){
    var total = 0;
    for (var i = 0; i < hand.length; i++) {
      if(hand[i].value === num){
        total += num;
      }
    }
    return total;
  }

  function chance(hand){
    var total = 0;
    for (var i = 0; i < hand.length; i++) {
        total += hand[i].value;
    }
    return total;
  }

  function yahtzee(hand){
    var valArr = [];
    for (var i = 0; i < hand.length; i++) {
      valArr.push(hand[i].value);
    }
    if(valArr[0] === valArr[1] && valArr[2] === valArr[3] && valArr[4] === valArr[5] && valArr[0] === valArr[2] && valArr[4] === valArr[1]){
    return 50;
    }
    else{
      return 0;
    }
  }

  function smlStraight(hand){
    var valArr = [];
    for (var i = 0; i < hand.length; i++) {
      valArr.push(hand[i].value);
    }
    if(valArr.indexOf(1) != -1 && valArr.indexOf(2) != -1 && valArr.indexOf(3) != -1 && valArr.indexOf(4)){
      return 30;
    }
    else if(valArr.indexOf(2) != -1 && valArr.indexOf(3) != -1 && valArr.indexOf(4) != -1 && valArr.indexOf(5) != -1){
      return 30;
    }else if(valArr.indexOf(3) != -1 && valArr.indexOf(4) != -1 && valArr.indexOf(5) != -1 && valArr.indexOf(6) != -1){
      return 30;
    }else{
      return 0;
    }
  }

  function lrgStraight(hand){
    var valArr = [];
    for (var i = 0; i < hand.length; i++) {
      valArr.push(hand[i].value);
    }
    valArr.sort();
    if(valArr.indexOf(1) != -1 && valArr.indexOf(2) != -1 && valArr.indexOf(3) != -1 && valArr.indexOf(4) && valArr.indexOf(5)){
      return 40;
    }
    else if(valArr.indexOf(2) != -1 && valArr.indexOf(3) != -1 && valArr.indexOf(4) != -1 && valArr.indexOf(5) != -1 && valArr.indexOf(6) != -1){
      return 40;
    }else{
      return 0;
    }
  }

  function fullHouse(hand){
    var valArr = [];
    for (var i = 0; i < hand.length; i++) {
      valArr.push(hand[i].value);
    }
    valArr.sort();

    if(valArr[0] === valArr[1]){
      if(valArr[1] === valArr[2] && valArr[3] === valArr[4]){
        return 25;
      }
      else if(valArr[2] === valArr[3] && valArr[3] === valArr[4]){
        return 25;
      }
      else{
        return 0;
      }
    }
    else{
      return 0;
    }
  }

  function threeKind(hand){
    var valArr = [];
    for (var i = 0; i < hand.length; i++) {
      valArr.push(hand[i].value);
    }
    valArr.sort();

    if(valArr[0] === valArr[1] && valArr[1] === valArr[2]){
      return chance(hand);
    }
    else if(valArr[1] === valArr[2] && valArr[2] === valArr[3]){
      return chance(hand);
    }
    else if(valArr[2] === valArr[3] && valArr[3] === valArr[4]){
      return chance(hand);
    }
    else{
      return 0;
    }
  }

  function fourKind(hand){
    var valArr = [];
    for (var i = 0; i < hand.length; i++) {
      valArr.push(hand[i].value);
    }
    valArr.sort();

    if(valArr[0] === valArr[1] && valArr[1] === valArr[2] && valArr[2] === valArr[3]){
      return chance(hand);
    }
    else if(valArr[1] === valArr[2] && valArr[2] === valArr[3] && valArr[3] === valArr[4]){
      return chance(hand);
    }
    else{
      return 0;
    }
  }



  function hold(value){
    console.log(value);
  }



});
