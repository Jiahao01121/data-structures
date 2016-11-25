var fs = require("fs");
var five = require("johnny-five");
var board = new five.Board();
//var full = full bottle 1000 ~ 1200;
//var empty = empty bottle 965 ～ 980;
//variance = full - empty = 45;
//the bottle have 450ml capacity, so 1 paramiter = 10ml

var arr = [];
board.on("ready", function() {
  ForceSensor = new five.Sensor({
    pin:"A0",
    freq:1500,
    threshold:10
  });
  ForceSensor.booleanAt(100);
  ForceSensor.on("change",function(){
    var a = {};
  date = new Date();
    a.date = date;
    a.drink = this.boolean;
    a.value = this.value;
    arr.push(a);
    console.log(arr);
    fs.writeFileSync("data.json",JSON.stringify(arr),"utf8");
    
  });   //sensorON
});     //boardON
