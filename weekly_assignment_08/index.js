var fs = require('fs');
var async = require('async');
var pg = require('pg');
var epoch = require('epoch.js');
//complie file to one array
var file = {
  thu : 'data/data_THU.json',
  fri : 'data/data_FRI.json',
  sat : 'data/data_SAT.json'
};
var wholeData = [];  //array
  //read three seperate file and change those file to one array
  async.forEachOf(file,
    function(each,key,callback){
      var trans = fs.readFileSync(each,'utf8');
      var deserialized = JSON.parse(trans);
      for (var i = 0; i < deserialized.length; i++) {
        wholeData.push(deserialized[i]);
      }
      callback();
    },
    function(err){
      if(err){
        throw err;
      }
});
// console.log(wholeData);
/***************************************
***********  done compile  *************
***************************************/

//postgreDB stuff

//configuration
var pg = require('pg');
var un = 'will'; // AWS db username
var pw = 'assignment'; // AWS db password
var db = 'arduinodrink'; // AWS db database name
var ep = 'arduinodrink.ciluhrlkozis.us-west-2.rds.amazonaws.com:5432'; // AWS db endpoint
var conString = "postgres://" + un + ":" + pw + "@" + ep + "/" + db;  // AWS configuration string

//query clause
// var createTableQuery = "CREATE TABLE drink(drinkDate date, drinkTime time, drinkTimeStamp timestamp, drink boolean, drinkAmount smallint);"
// var insertIntoQuery = `INSERT INTO drink VALUES ('${transfer.date}','${transfer.time}','${transfer.timestamp}',${transfer.drink},${transfer.value});`,

pg.connect(conString, function(err, client, done) {
  if(err){return console.error('error fetching client from pool', err)}
  for (var i = 0; i < wholeData.length; i++) {
    //use epoch module to parse to sql time,date,timestamp.
    transfer = {};
    transfer.date = epoch(wholeData[i].date).sqldate();
    transfer.time = epoch(wholeData[i].date).sqltime();
    transfer.timestamp = epoch(wholeData[i].date).datetime();
    transfer.drink = wholeData[i].drink;
    transfer.value = wholeData[i].value;
    //query
    client.query(`INSERT INTO drink VALUES ('${transfer.date}','${transfer.time}','${transfer.timestamp}',${transfer.drink},${transfer.value});`,
        function(err, result) {
          //call `done()` to release the client back to the pool
          done();
          if (err){return console.error('error running query', err);}
          console.log("success insert to db")
    });  //query
  }
});
/***************************************
***********  done insert  **************
***************************************/
