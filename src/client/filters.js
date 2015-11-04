app.filter('round', function(){
    return function(input){
    return input.toFixed(0);
  };
});

