var pg = require('pg');

// connection string
var un = 'will'; // aws db username
var pw = 'assignment'; // aws db password
var db = 'arduinodrink'; // aws db database name
var ep = 'arduinodrink.ciluhrlkozis.us-west-2.rds.amazonaws.com:5432'; // aws db endpoint
var conString = "postgres://" + un + ":" + pw + "@" + ep + "/" + db;

var createTableQuery = "CREATE TABLE drink (date timestamp ,drink boolean,value INTEGER);"
var insertIntoQuery = "INSERT INTO drink VALUES ('2016-11-06T02:16:15.188Z', FALSE, 1100);"
var query = "SELECT * FROM drink;"

pg.connect(conString, function(err, client, done) {
    if(err){return console.error('error fetching client from pool', err);}

    client.query(insertIntoQuery, function(err, result) {
        //call `done()` to release the client back to the pool
        done();

        if (err) {return console.error('error running query', err);}
        console.log(result);
    });
    //query
});
