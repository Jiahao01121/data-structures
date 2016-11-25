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
var date = require("date.js");
var dateFormat = require('dateformat');
var fs = require("fs");
var eachObj = read.readJSONFile('from3API.json');
//create a new array of order property position
var orderedData = [];
for(var i = 0;i<eachObj.length;i++){
var order = {
    latLng : eachObj[i].latLng,
    meetingName : eachObj[i].meetingName,
    dayOfTheWeek : eachObj[i].dayOfTheWeek,
    startTime : eachObj[i].startTime,
    endTime : eachObj[i].endTime,
    region : eachObj[i].region,
    location : eachObj[i].location,
    locationNotes : eachObj[i].locationNotes,
    sameMeetPlace : eachObj[i].sameMeetPlace,
    formatAddress : eachObj[i].formatAddress,
    types : eachObj[i].types,
    group : eachObj[i].group,
    meetingNotes : eachObj[i].meetingNotes,
    detailedPageLink : eachObj[i].link,
    sameMeetPlaceLink : eachObj[i].sameMeetPlaceLink
    };
    orderedData.push(order);
}
// clean property
var clean = {
    MeetingName : function(eachObj){
                if (eachObj.meetingName.match(/\(\:/)){
                    eachObj.meetingName = eachObj.meetingName.split(/\(.+?\)/)[0];
                }    
                if(eachObj.meetingName.match(/\(.+\)/)){
                    eachObj.meetingName = eachObj.meetingName.split(/\(.*\)/)[0];
                }
                if(eachObj.meetingName.match(/.+\//)){
                    eachObj.meetingName = eachObj.meetingName.split(/\//)[0];
                }
                if(eachObj.meetingName.match(/\-/)){
                    eachObj.meetingName = eachObj.meetingName.split(/\s\-\s/)[0];
                }
    },//meetName
    endTimeAndStartTime: function(eachObj){
                eachObj.endTime = dateFormat(date(orderedData[i].endTime.trim()), "HH:MM");
                eachObj.startTime = dateFormat(date(orderedData[i].startTime), "HH:MM");
    },//time
    sameMeetPlace: function(eachObj){
                eachObj.sameMeetPlace = eachObj.sameMeetPlace.trim();
    },//sameMeetPlace
    group: function(eachObj){
                if(eachObj.group.match(/\n+\t*/)){
                    eachObj.group = eachObj.group.split(/(?=\))*\n+\t*/g);
                }
    },//group
    sameMeetPlaceLink: function(eachObj){
        eachObj.sameMeetPlaceLink = eachObj.sameMeetPlaceLink.href;
    }
};//clean
for(var i = 0; i < orderedData.length; i++){
    clean.MeetingName(orderedData[i]);
    clean.sameMeetPlace(orderedData[i]);
    clean.group(orderedData[i]);
    clean.endTimeAndStartTime(orderedData[i]);
    clean.sameMeetPlaceLink(orderedData[i])
   
}
console.log(orderedData)
fs.writeFileSync('from4Cleaned.json',JSON.stringify(orderedData))





//********************************************END*********************************





// var query = {
//     groupName: function(eachObj){
//         if(typeof eachObj.group === "string"){
//             return eachObj.group;
//         }
//         else{
//             return eachObj.group[0];
//         }
//     },//groupName()
//     groupRest: function(eachObj){
//         if(typeof eachObj.group !== "string"){
//             for (var it = 0;it<eachObj.group.length;it++){
//                 return eachObj.group[it+1];
//             }//for
//         }//if
//         else{return }
//     }//groupRest()
// }

//  //not NYC
 
//     for( var i = 0;i<data.length;i++ )
//     {
//         if(data[i].formatAddress.match(/^(?!.*NY).+$/g)){
//             console.log(data[i])
//         }
//     }