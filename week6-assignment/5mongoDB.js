var read = { 
    readJSONFile :function (file){
        var data = fs.readFileSync(file,'utf8');
        return JSON.parse(data);
    },
    readHTMLFile :function(file){
        var data = fs.readFileSync(file,'utf8');
        return data;
    }
};
var fs = require("fs");
var data = read.readJSONFile('from4Cleaned.json');
// console.log(data)
var dbName = 'aameeting';
var colName = 'aainfo';
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://' + process.env.IP + ':27017/' + dbName;

MongoClient.connect(url, function(err, db) {
    if (err) {return console.dir(err);}
    for(var i = 0; i<data.length; i++){            
        db.collection(colName).insert(data[i]);
    }
    
  db.close();
});

