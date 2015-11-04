app.filter('round', function(){
    return function(input){
      if(isNaN(input)){
        return 0;
      }
    return input.toFixed(0);
  };
});

