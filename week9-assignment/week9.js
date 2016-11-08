//postgreDB
var pg = require('pg');
var un = 'will'; // aws db username
var pw = 'assignment'; // aws db password
var db = 'arduinodrink'; // aws db database name
var ep = 'arduinodrink.ciluhrlkozis.us-west-2.rds.amazonaws.com:5432'; // aws db endpoint
var conString = "postgres://" + un + ":" + pw + "@" + ep + "/" + db;
//Sensor
/*****************************************************
var full = full bottle 1000 ~ 1200;
var empty = empty bottle 965 ～ 980;
variance = full - empty = 45;
the bottle have 450ml capacity, so 1 paramiter = 10ml
******************************************************/
var fs = require("fs");
var five = require("johnny-five");
var board = new five.Board();


board.on("ready", function() {
  ForceSensor = new five.Sensor({
    pin:"A0",
    freq:1500,
    threshold:10
  });
  ForceSensor.booleanAt(100);
  ForceSensor.on("change",function(){
    var a = {};
    var date = new Date();
    //sql Date fomatter
    function pgFormatDate(date) {
      function zeroPad(d) {
        return ("0" + d).slice(-2)
      }
      var parsed = new Date(date)
      return [parsed.getUTCFullYear(), zeroPad(parsed.getMonth() + 1), zeroPad(parsed.getDate()), zeroPad(parsed.getHours()), zeroPad(parsed.getMinutes()), zeroPad(parsed.getSeconds())].join(" ");
    }

    a.date = new Date();
    a.drink = this.boolean;
    a.value = this.value;
    console.log(a)
    //insertData
    var insertIntoQuery = "INSERT INTO drink VALUES (" + a.date + "," + a.drink + "," + a.value+ ");"
    pg.connect(conString, function(err, client, done) {
        if(err){return console.error('error fetching client from pool', err);}

        client.query(insertIntoQuery, function(err, result) {
            //call `done()` to release the client back to the pool
            done();

            if (err) {return console.error('error running query', err);}
            console.log(result);
            console.log("success insert to db")
        });
    });

  });   //sensorON
});     //boardON
