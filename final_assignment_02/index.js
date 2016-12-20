const fs = require("fs"),
      five = require("johnny-five"),
      epoch = require("epoch.js"),
      socketio = require('socket.io'),
      pg = require('pg'),
      http = require('http'),
      stream = require('stream'),
      events = require('events'),
      util = require('util');
/**************************************************************
                      WEB SERVER
     use node http module create a server and declear
     a function statement called handler.
**************************************************************/
var indexHtml = fs.readFileSync(__dirname + '/index.html');
var app = http.createServer(handler);
var io = socketio(app);
app.listen(3000);
/**************************************************************
                      DB configuration
    un - aws db username           pw - aws db password
    db - aws db database name      ep - aws db endpoint
**************************************************************/
var un = 'will';
var pw = 'assignment';
var db = 'arduinodrink';
var ep = 'arduinodrink.ciluhrlkozis.us-west-2.rds.amazonaws.com:5432';
var conString = "postgres://" + un + ":" + pw + "@" + ep + "/" + db;
/**************************************************************
                 SENSOR description
    calculated from `calculation_of_sensor_read.js`
      var full = full bottle  1005        (1000 ~ 1200;)
      var empty = empty bottle 975        (965  ～ 980;)
      variance = full - empty = 30;
    the bottle have 450ml capacity, so 1 paramiter = 15ml
**************************************************************/
function handler (req, res) {
    res.writeHead(200);
    res.end(indexHtml);
};
/**************************************************************
                 Event emmiter
    When new data coming in, emit an event to pass data to socket
**************************************************************/
var EmitData = new events.EventEmitter();
/**************************************************************
                 johnny-five
    listen change on ForceSensor, when changed, fire callback
    function and insert data to database.
**************************************************************/
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
  //For socket io. pass new data to browser.
    var forAPI = {};
    forAPI.drink = this.boolean;
    forAPI.drinkamount = this.value;
    forAPI.drinkdate = epoch(transfer.date).sqldate();
    forAPI.drinktime = epoch(transfer.date).sqltime();
    forAPI.drinktimestamp = epoch(transfer.date).datetime();
  //emit an event, pass new data to socket
    EmitData.emit("freashData", forAPI)
  //insert new Data to database.
    pg.connect(conString, function(err, client, done) {
      if(err){return console.error('error fetching client from pool', err);}
      client.query(`INSERT INTO drink VALUES ('${epoch(transfer.date).sqldate()}','${epoch(transfer.date).sqltime()}','${epoch(transfer.date).datetime()}',${transfer.drink},${transfer.value});`, function(err, result) {
          done();
          if (err) {return console.error('error running query', err);}
          console.log("success insert to db");
      }); //pg.query
    });  //pg.connect
  });  //sensorON
});  //boardON
/**************************************************************
                 socket.io
    Mainly two behaviour:
      1. when page load, query data base and send 'history' data.
      2. listen to the event "freashData", and pass new data to browser.
**************************************************************/
io.on('connection', function (socket) {
//when page load, query database to get all history data.
  pg.connect(conString, function(err, client, done) {
    if(err){return console.error('error fetching client from pool', err);}
    client.query(`SELECT * FROM drink`, function(err, result) {
      if (err) {return console.error('error running query', err);}
      done();
      socket.emit('activate',result.rows);
  });  //pg.query
  });  //pg.connect
//listen freashdata, and emit an event to pass incoming data to browser
  EmitData.on("freashData",function(incomingdata){
    socket.emit('responsive',incomingdata);
  })
});
