## AA meeting NYC finder redesign

reorder data structure:
- aggregation pipeline code:

base on current datetime, match incoming meeting(include meeting before tomorrow 4am ) and group by
all data record base the six criteria show below in second stage, push relevant info, and then enter third
stage, group again, but this time only group by geo location, aggregate meetings on the same meeting location to an array, called ```samePleaceMeet```.

```js
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
]
```


- output

```js
{ _id: { lat: 40.7944661, lng: -73.9706389 },
  samePlaceMeet:
   [ { meetingName: 'Ninety-Sixth Street Workshop',
       region: 'Upper West Side',
       formatAddress: '207 W 96th St, New York, NY 10025, USA',
       location: 'Holy Name Church',
       locationNotes: 'Basement Between Amsterdam Avenue & Bway',
       meetingDetails:
        [ { startTime: '22:00',
            endTime: '23:15',
            types: 'Step Meeting',
            group: 'NINETY-SIXTH STREET WORKSHOP (Group #13400)',
            meetingNotes: 'undefined' } ] },
     { meetingName: 'We Are Not Doctors ',
       region: 'Upper West Side',
       formatAddress: '207 W 96th St, New York, NY 10025, USA',
       location: 'Holy Name Church',
       locationNotes: 'Basement Between Amsterdam Avenue & Bway',
       meetingDetails:
        [ { startTime: '18:00',
            endTime: '19:00',
            types: 'Open, Topic Discussion',
            group: 'WE ARE NOT DOCTORS (WESTSIDE) (Group #7J)',
            meetingNotes: 'undefined' } ] },
     { meetingName: 'Turn It Over',
       region: 'Upper West Side',
       formatAddress: '207 W 96th St, New York, NY 10025, USA',
       location: 'Holy Name Church',
       locationNotes: 'Basement Between Amsterdam Avenue & Bway',
       meetingDetails:
        [ { startTime: '15:30',
            endTime: '16:30',
            types: 'Beginner',
            group: 'TURN IT OVER (Group #14960)',
            meetingNotes: 'undefined' },
          { startTime: '16:30',
            endTime: '17:30',
            types: 'Closed',
            group: 'TURN IT OVER (Group #14960)',
            meetingNotes: 'undefined' } ] },
     { meetingName: 'Mid-Day Cheer',
       region: 'Upper West Side',
       formatAddress: '207 W 96th St, New York, NY 10025, USA',
location: 'Holy Name Church',
locationNotes: 'Basement Between Amsterdam Avenue & Bway',
meetingDetails:
 [ { startTime: '13:00',
     endTime: '14:15',
     types: 'Big Book',
     group: 'MID-DAY CHEER (Group #12880)',
     meetingNotes: 'undefined' } ] },
{ meetingName: 'First Things First',
region: 'Upper West Side',
formatAddress: '207 W 96th St, New York, NY 10025, USA',
location: 'Holy Name Church',
locationNotes: 'Basement Between Amsterdam Avenue & Bway',
meetingDetails:
 [ { startTime: '06:00',
     endTime: '07:00',
     types: 'Literature, Open, Topic Discussion',
     group: 'FIRST THINGS FIRST (Group #11520)',
     meetingNotes: 'As Bill Sees It' },
   { startTime: '07:15',
     endTime: '08:15',
     types: 'Closed',
     group: 'FIRST THINGS FIRST (Group #11520)',
     meetingNotes: 'undefined' },
   { startTime: '08:45',
     endTime: '09:45',
     types: 'Beginner',
     group: 'FIRST THINGS FIRST (Group #11520)',
     meetingNotes: 'undefined' },
   { startTime: '10:15',
     endTime: '11:15',
     types: 'Closed, Literature',
     group: 'FIRST THINGS FIRST (Group #11520)',
     meetingNotes: 'Living Sober' } ] } ] }
```

## google map API
use google map API to show data on the map.

![mockup](https://raw.githubusercontent.com/Jiahao01121/data-structures/master/final_assignment_01/map01.jpeg)

![mockup](https://raw.githubusercontent.com/Jiahao01121/data-structures/master/final_assignment_01/map02.jpeg)

![mockup](https://raw.githubusercontent.com/Jiahao01121/data-structures/master/final_assignment_01/map03.jpeg)
