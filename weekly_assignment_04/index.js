var fs = require('fs'),
    MongoClient = require('mongodb').MongoClient;

var json = fs.readFile('output.json','utf8',function(err,data){
  if (err) throw err;
  var address = JSON.parse(data);
  var DBurl = 'mongodb://localhost:27017/aameeting'
  MongoClient.connect(DBurl, function(err, db) {
    if(err){console.log(err)}
    var collection = db.collection('col');
    collection.insertMany(address,function(err,result){
      if(err){console.log(err)}
      console.log(result);
      db.close();
    });//insert
  });//connect
});//readFile

/***********************
    note:
    show dbs
    show collections
    use aameeting
************************/
