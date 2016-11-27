const fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var dbUrl = 'mongodb://' + process.env.IP + ':27017/aameetingfinal';
var http = require('http');
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
  "use strict"
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
      {  $match : { dayOfTheWeek : "Tuesday" }  }
      ,
      //stage2
      {  $group : { _id : {latLng : "$latLng",
                           meetingName : "$meetingName",
                           region :"$region",
                           formatAddress:"$formatAddress",
                           location:"$location",
                           locationNotes:"$locationNotes",
                           sameMeetPlaceLink:"$sameMeetPlaceLink"
                          },

                    meetings : {
                      $push : {
                        startTime : "$startTime",
                        endTime : "$endTime",
                        // sameMeetPlace:"$sameMeetPlace",
                        types:"$types",
                        group:"$group",
                        meetingNotes:"$meetingNotes",
                      }
                    }
                  }
      }
      ,
      // stage3
      {  $group : { _id : "$_id.latLng", samePlaceMeet :{$push :{
                                         meetingName : "$_id.meetingName",
                                         region :"$_id.region",
                                         formatAddress:"$_id.formatAddress",
                                         location:"$_id.location",
                                         locationNotes:"$_id.locationNotes",
                                         sameMeetPlaceLink:"$_id.sameMeetPlaceLink",
                                          meetingDetails: "$meetings"}  } }

      }
              ],function(err,result){
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
