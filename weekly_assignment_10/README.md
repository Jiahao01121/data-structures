### mongod_index.js

server for AA meeting API.

- route:
https://weekly10-willsuuu.c9users.io
- aggregation pipeline:
```js
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
```

- api output:

![aa](https://raw.githubusercontent.com/Jiahao01121/data-structures/workInProgress/weekly_assignment_10/AAmeeting.jpg)



### postgre_index.js
server for sensor API

- route: https://weekly10-willsuuu.c9users.io

data out put:
![aa](https://raw.githubusercontent.com/Jiahao01121/data-structures/workInProgress/weekly_assignment_10/drinkingData.jpg)
