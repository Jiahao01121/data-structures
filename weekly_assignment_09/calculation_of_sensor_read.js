var empty_bottle = [980,985,975,970,976,957,970,973,965,985,991]
var full_bottle = [1006,1001,1005,1007,1005,1007,1008,1007,1004,1006]
empty_bottle.sort();
full_bottle.sort();

function sum(nums){
  return nums.reduce(function(a,b){
    return a+b;
  },0);
}

function avg(nums){
  var sum = nums.reduce(function(a,b){
    return a+b;
  },0);
  return sum/nums.length;
}

function std(nums){
  var x_bar = avg(nums);
  var numerator = 0;
  for (var i = 0; i < nums.length; i++) {
      var a = nums[i] - x_bar;
      numerator += Math.pow(a,2);
  }
  var whole = numerator/ sum(nums);
  return Math.sqrt(whole);
}
console.log(full_bottle);
console.log(avg(full_bottle));
console.log(std(full_bottle));

/*********************
empty bottle:
--------mean:975.1818181818181
--------median:975
--------mode:970 985
--------std: 0.2990984813116243
--------confident interval at 95%: 975 ~ 975.3

conclusion: 975 for empty bottle.


full bottle(450ml):
--------mean:1005.6
--------median:1006
--------mode:1007
--------std: 0.060164187975219795

conclusion: 1005 for empty bottle.

*********************/
