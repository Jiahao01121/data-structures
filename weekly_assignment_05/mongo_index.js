const fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var dbUrl = 'mongodb://localhost:27017/aameetingfinal';
/***********************
    note:
    show dbs
    show collections
    use aameeting
    start DB instances :
    ./mongod --dbpath=/Users/willsu/Documents/data-structure/Final_assignment_01_AAmeeting/data/db --nojournal
************************/

//fix group
function data(file){
  let a = fs.readFileSync(file,"utf8");
  return JSON.parse(a);
}
var dataSet = data("output.json");
for(var i = 0;i<dataSet.length;i++){
  if(typeof dataSet[i].group !== 'string'){
    dataSet[i].group = dataSet[i].group[0]
  }
}

//DB operation
MongoClient.connect(dbUrl,function(err,db){
  if(err){
    console.log(err)
  } //handle error

  /******************
  @@@ insert data @@@
  *******************/
  db.collection('a').insertMany(dataSet,function(err,result){
    if(err){console.log(err)}  //handle error

    /******************
    @@@ second op @@@
    *******************/
    //meeting aggregation priciple: show meeting based on location and detailed info (f.ex same meeting but different time and stuff)are showed in second array.
    db.collection('a').aggregate([
             //stage1
                    {  $match : {"dayOfTheWeek" : "Sunday"}  }
                    ,
             //stage2
                    {  $group:  {  _id: {meetingName:"$meetingName",region: "$region",AddressMain:"$formatAddress",address1:"$location",address2:"$locationNotes",sameMeetPlaceLink:"$sameMeetPlaceLink",latLng:"$latLng"},

                                 dayOfTheWeek : {$push : "$dayOfTheWeek" },
                                 startTime : {$push : "$startTime" } ,
                                 endTime : {$push : "$endTime" },
                                 types : {$push : "$types" },
                                 group : {$push : "$group"},
                                }
                    }
                    ,
             //stage3
                    {  $group:  {  _id: {latLong : "$_id.latLng" },

                                   meeting : {$addToSet : { meetingGroup : "$_id",

                                                              meetings : {
                                                                dayOfTheWeek : "$dayOfTheWeek",
                                                                startTime : "$startTime",
                                                                endTime : "$endTime",
                                                                types : "$types",
                                                                group : "$group"
                                                              }
                                                            }
                                              }

                    } } ],function(err,result){

                          if(err){console.log(err)};
                          var server = http.createServer(function(req,res){
                            res.writeHead(200,{"content-type" : "application/json"});
                            res.end(JSON.stringify(result))
                          }).listen(process.env.PORT,process.env.IP)
      // for (var i = 0; i < result.length; i++) {
        // console.log(result[i].meeting[0].meetings);
      // }
      db.close();
    });//aggregate;

    console.log("success");
  });//insert

});//connect
