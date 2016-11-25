var   fs = require("fs"),
      five = require("johnny-five"),
      epoch = require("epoch.js");
//DB configuration
var pg = require('pg');
var un = 'will'; // aws db username
var pw = 'assignment'; // aws db password
var db = 'arduinodrink'; // aws db database name
var ep = 'arduinodrink.ciluhrlkozis.us-west-2.rds.amazonaws.com:5432'; // aws db endpoint
var conString = "postgres://" + un + ":" + pw + "@" + ep + "/" + db;

/*****************************************************
                 sensor description
    calculated from `calculation_of_sensor_read.js`
var full = full bottle  1005        (1000 ~ 1200;)
var empty = empty bottle 975        (965  ～ 980;)
variance = full - empty = 30;
the bottle have 450ml capacity, so 1 paramiter = 15ml
******************************************************/
var board = new five.Board();

board.on("ready", function() {
  ForceSensor = new five.Sensor({
    pin:"A0",
    freq:1500,
    threshold:10
  });
  ForceSensor.booleanAt(100);
  //listen ForceSensor changes, if change, log the number.
  ForceSensor.on("change",function(){
    var transfer = {};
    transfer.date = new Date().toISOString();
    transfer.drink = this.boolean;
    transfer.value = this.value;
    console.log(transfer)
    //insertData
    pg.connect(conString, function(err, client, done) {
      if(err){return console.error('error fetching client from pool', err);}

      client.query(`INSERT INTO drink VALUES ('${epoch(transfer.date).sqldate()}','${epoch(transfer.date).sqltime()}','${epoch(transfer.date).datetime()}',${transfer.drink},${transfer.value});`, function(err, result) {
          done();
          if (err) {return console.error('error running query', err);}
          console.log(result);
          console.log("success insert to db")
      });
    });  //pg.connect
  });  //sensorON
});  //boardON
