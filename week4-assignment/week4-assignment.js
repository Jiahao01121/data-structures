var request = require("request");
var fs = require('fs')
var add = [];
//access address's JSON file
var json = fs.readFileSync('week4-assignment/address.json','utf8')
//change JSON string to JSON object
var address =[];
eval("address="+json);
for(var i = 0; i<address.length; i++){
    var DBformat = new Object();
    DBformat.address = address[i].address;
    DBformat.location = address[i].location;
    DBformat.name = " ";
    DBformat.meetingType = " ";
    add.push(DBformat)
    // fs.appendFileSync('DBformat.json',JSON.stringify(DBformat),'utf8')
}

var MongoClient = require('mongodb').MongoClient;
var linkDB = 'mongodb://' + process.env.IP + ':27017/test'

MongoClient.connect(linkDB, function(err, db) {
    if(err){console.log(err)}
         var collection = db.collection('col');
         for (var i=0; i < add.length; i++) {
            collection.insert(add[i]);
            }
        db.close();

    });
    
    
 
 
 
 
 
    

// for(var i = 0 ; i < add.length; i++){
// var collection = db.collection('col')
// collection.insert(add[i])
// }        
// db.close();
