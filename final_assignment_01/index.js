const MongoClient = require('mongodb').MongoClient,
      dbUrl = 'mongodb://localhost:27017/aameetingfinal',
      http = require('http'),
      fs = require("fs");
      var indexHead = fs.readFileSync("index_head.txt");
      var indexEnd = fs.readFileSync("index_end.txt");
var server = http.createServer(function(req, res) {

MongoClient.connect(dbUrl,function(err,db){
  if(err){console.log(err)} //handle error

    //time operation
    var dateTimeNow = new Date();
    //hours
    var hourForAggre = dateTimeNow.getHours();
    if(hourForAggre < 10 && hourForAggre !== 0){
      hourForAggre = `0${hourForAggre}:00`
    }
    else if (hourForAggre >10){
      hourForAggre = `${hourForAggre}:00`
    }
    else if(hourForAggre == 0){
      hourForAggre = `0${hourForAggre}:00`
    }
    console.log(hourForAggre);
    //dayofweek
    var today = dateTimeNow.getDay(); //weekDay
    var todayForRegex,tomorrowForReggex;
    switch (today) {
      case 0:
        todayForRegex = "Sunday";
        tomorrowForReggex = "Monday";
        break;
        case 1:
          todayForRegex = "Monday";
          tomorrowForReggex = "Tuesday";
          break;
          case 2:
            todayForRegex = "Tuesday";
            tomorrowForReggex = "Wednesday";
            break;
            case 3:
              todayForRegex = "Wednesday";
              tomorrowForReggex = "Thursday";
              break;
              case 4:
                todayForRegex = "Thursday";
                tomorrowForReggex = "Friday";
                break;
                case 5:
                  todayForRegex = "Friday";
                  tomorrowForReggex = "Saturday";
                  break;
                  case 6:
                    todayForRegex = "Saturday";
                    tomorrowForReggex = "Sunday";
                    break;
    }
    var regexForAggre_today = new RegExp(todayForRegex,"g");
    var regexForAggre_tomorrow = new RegExp(tomorrowForReggex,"g");

    //meeting aggregation priciple: show meeting based on location
    //and detailed info (f.ex: same meeting but different time and stuff)
    //are showed in second array.
    db.collection('a').aggregate([
      //stage1
        //match every meeting after or equal current time and meeting before tomorrow 4am
      {  $match : {$or: [ //two $and within $or
                      { $and: [
                           {dayOfTheWeek : {$regex : regexForAggre_today } },
                           {startTime    : {$gte    : hourForAggre        } }
                      ]},
                      { $and: [
                           {dayOfTheWeek : {$regex : regexForAggre_tomorrow } },
                           {startTime    : {$lte    : "04:00"        } }
                      ]}
                  ]}
      }
      ,
      //stage2
      {  $group : { _id : {latLng : "$latLng",
                           meetingName : "$meetingName",
                           region :"$region",
                           formatAddress:"$formatAddress",
                           location:"$location",
                           locationNotes:"$locationNotes",
                          //  sameMeetPlaceLink:"$sameMeetPlaceLink"
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
      if(err){console.log(err)}
      else {
          res.writeHead(200, {'content-type': 'text/html'});
          res.write(indexHead);
          res.write(JSON.stringify(result));
          res.end(indexEnd);
      }
      fs.writeFileSync('aggre.json',JSON.stringify(result),'utf8');
      db.close();
          // console.log(result);
    }); //aggregate;
});   //connect
}).listen(3000)//server
