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
    // var diceFace = [0, '\u2680', '\u2681', '\u2682', '\u2683', '\u2684', '\u2685'];
     var diceFace = [0, '/public/die1.png', '/public/die2.png', '/public/die3.png', '/public/die4.png', '/public/die5.png', '/public/die6.png'];

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
    if(valArr[0] === valArr[1] && valArr[1] === valArr[2] && valArr[2] && valArr[3] === valArr[3] && valArr[4]){
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


app.factory('LoginServices', [ '$http','$q', '$rootScope', function($http, $q, $rootScope) {
  var user = null;

  return {isLoggedIn: isLoggedIn,
          getUserStatus: getUserStatus,
          login: login,
          logout: logout,
          register: register,
          update: update};


    function isLoggedIn(){
      if (user){
        return true;
      }
      else {
        return false;
      }
    }

    function getUserStatus(){
      return user;
    }

    function update(updateThis){
      // create a new instance of deferred
      var deferred = $q.defer();
      $http.put('/users/update', updateThis)
      .success(function(data, status){
          if(status === 200 && data.status){
            console.log(data);
            user = true;
            deferred.resolve(data);
          } else {
            user = false;
            deferred.reject();
          }
        })
        // handle error
        .error(function (data) {
          user = false;
          deferred.reject();
        });
      // return promise object
      return deferred.promise;
    }

    function login (username, password){
      // create a new instance of deferred
      var deferred = $q.defer();

      // send a post request to the server
      $http.post('/users/login', {username: username, password: password})
        // handle success
        .success(function (data, status) {
          if(status === 200 && data.status){
            user = true;
            deferred.resolve(data);
          } else {
            user = false;
            deferred.reject();
          }
        })
        // handle error
        .error(function (data) {
          user = false;
          deferred.reject();
        });

      // return promise object
      return deferred.promise;
    }

    function logout() {
      // create a new instance of deferred
      var deferred = $q.defer();

      // send a get request to the server
      $http.get('/users/logout')
        // handle success
        .success(function (data) {
          user = false;
          deferred.resolve();
        })
        // handle error
        .error(function (data) {
          user = false;
          deferred.reject();
        });
      // return promise object
      return deferred.promise;
    }

  function register(username, password){
  // create a new instance of deferred
    var deferred = $q.defer();

    // send a post request to the server
    $http.post('/users/register', {username: username, password: password})
      // handle success
      .success(function (data, status) {
        if(status === 200 && data.status){
          login(username, password);
          // user = true;
          // $rootScope.user = username;

          deferred.resolve(data);
        } else {
          deferred.reject();
        }
      })
      // handle error
      .error(function (data) {
        deferred.reject(data);
      });

    // return promise object
    return deferred.promise;
  }

}]); //end login services
