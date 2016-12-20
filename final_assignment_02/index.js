//config
const fs = require("fs"),
      five = require("johnny-five"),
      epoch = require("epoch.js"),
      socketio = require('socket.io'),
      pg = require('pg'),
      http = require('http'),
      stream = require('stream'),
      events = require('events'),
      util = require('util');
//server
var indexHtml = fs.readFileSync(__dirname + '/index.html');
var app = http.createServer(handler);
var io = socketio(app);
app.listen(3000);
//DB configuration
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
function handler (req, res) {
    res.writeHead(200);
    res.end(indexHtml);
}
//emmiter
var EmitData = new events.EventEmitter()

//dynamically data generator(drinking action)
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
    // console.log(transfer);

    var forAPI = {};

    forAPI.drink = this.boolean;
    forAPI.drinkamount = this.value;
    forAPI.drinkdate = epoch(transfer.date).sqldate();
    forAPI.drinktime = epoch(transfer.date).sqltime();
    forAPI.drinktimestamp = epoch(transfer.date).datetime();

    EmitData.emit("freashData", forAPI)
    //insertData
    pg.connect(conString, function(err, client, done) {
      if(err){return console.error('error fetching client from pool', err);}
      client.query(`INSERT INTO drink VALUES ('${epoch(transfer.date).sqldate()}','${epoch(transfer.date).sqltime()}','${epoch(transfer.date).datetime()}',${transfer.drink},${transfer.value});`, function(err, result) {
          done();
          if (err) {return console.error('error running query', err);}
          // console.log(result);
          console.log("success insert to db");
      }); //pg.query
    });  //pg.connect
  });  //sensorON
});  //boardON

io.on('connection', function (socket) {

  pg.connect(conString, function(err, client, done) {
    if(err){return console.error('error fetching client from pool', err);}
    client.query(`SELECT * FROM drink`, function(err, result) {
      if (err) {return console.error('error running query', err);}
      done();
      // console.log(result);
      socket.emit('activate',result.rows);
  });  //pg.query
  });  //pg.connect

//incoming data
  EmitData.on("freashData",function(incomingdata){
    // console.log(incomingdata);
    socket.emit('responsive',incomingdata);
  })
});
