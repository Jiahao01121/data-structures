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
  // db.collection('a').insertMany(dataSet,function(err,result){
    // if(err){console.log(err)}  //handle error

    /******************
    @@@ second op @@@
    *******************/
    //meeting aggregation priciple: show meeting based on location and detailed info (f.ex same meeting but different time and stuff)are showed in second array.
    db.collection('a').aggregate([
             //stage1
                    {  $match : {"dayOfTheWeek" : "Tuesday"}  }
                    ,
             //stage2
                    {  $group:  {  _id: {meetingName:"$meetingName",region: "$region",AddressMain:"$formatAddress",address1:"$location",address2:"$locationNotes",sameMeetPlaceLink:"$sameMeetPlaceLink",latLng:"$latLng"},

                                 dayOfTheWeek : {$push : "$dayOfTheWeek" },
                                 startTime : {$push :     "$startTime"        } ,
                                 endTime : {$push : "$endTime" },
                                 types : {$push : "$types" },
                                 group : {$push : "$group"},
                                }
                    }
            ],function(err,result){
                       if(err){console.log(err)};
                       for (let i = result.length -1; i >=0 ; i--) {
                        //  console.log(result[i]);
                         for (var it = result[i].startTime.length-1; it>=0; it--){
                            if (+result[i].startTime[it].match(/.+(?=:)/g)[0] < 19) {
                              // console.log(+result[i].startTime[it].match(/.+(?=:)/g)[0]);
                              result[i].startTime.splice(it,1);
                              result[i].endTime.splice(it,1);
                              result[i].dayOfTheWeek.splice(it,1);
                              result[i].types.splice(it,1);
                              result[i].group.splice(it,1);
                            }
                         }
                         if(result[i].dayOfTheWeek.length == 0){
                           result.splice(i,1)
                         }
                       }
                       console.log(result);
                       fs.writeFile('aggregationoutput.json',JSON.stringify(result),'utf8',function(){
                         db.close();
                       })
    });//aggregate;d
    console.log("success");
  // });//insert

});//connect
