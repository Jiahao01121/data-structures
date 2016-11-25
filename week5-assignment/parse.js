var fs = require("fs");
var unSortDataSet = fs.readFileSync('a.json','utf8')
var data;
//transfered JSON string
eval("data="+unSortDataSet); 
//filter out the empty object
var o = data.filter(function(el) {
  return Object.keys(el).length !== 0;
});
//arrange obj to denoramlized structure
var arrange =[]
for(var i = 0 ; i<o.length;i+=5){
    var a = Object.assign({},o[i],o[i-1],o[i-2],o[i-3],o[i-4])
    // console.log(a)
    arrange.push(a)
    
}
//convert date to ISOdate
var date = require("date.js")

for(var i = 0 ; i<arrange.length;i++){
    arrange[i].time = date( arrange[i].time );
}
//connect to MongoDB
var MongoClient = require('mongodb').MongoClient;
//Connection URL 
var url = 'mongodb://' +process.env.IP +':27017/aameeting';

//Use connect method to connect to the Server 
MongoClient.connect(url, function(err, db) {
    if (err) {return console.dir(err);}
    var collection = db.collection('aainfo');
    for(var i = 0;i<arrange.length;i++){
        collection.insert(arrange[i]);
        };
//query
    
    var collName = "aainfo";
    
        db.collection(collName).aggregate([
           {$project:
                {
                hour:{$hour : "$time"},
                min:{$minute:"$time"}}},
           {$match:
                {
                date:"Tuesday",
                hour:{$lt : 19,$ne : 0  }
                }
            }
        ]).toArray(function(err, docs) {
        if (err) {console.log(err)}
        
        else {
            console.log(docs);
        }
        db.close();
    });
})

