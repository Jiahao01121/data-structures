# Weekly Assignment 6
overview:
1. before:  
```json
{
  "dayOfTheWeek":"Sunday",
  "meetingName":"Room for Improvement (:II)",
  "address":"220 West Houston Street",
  "region":"Greenwich Village",
  "types":"Candlelight, Open, Topic Discussion",
  "location":"220 West Houston Street",
  "link":"http://meetings.nyintergroup.org/meetings/midnite-2?d=any&v=list",
  "startTime":"2:00 am",
  "endTime":" 3:15 am",
  "group":"DYCKMAN (Group #11280)
   BB 1st & T Last Wed",
  "apiFeed":"220 West Houston StreetNew York, NY 10014",
  "sameMeetPlace":"220 West Houston Street(49 other meetings at this location)\t\t\t\t\t\t\t",
  "sameMeetPlaceLink":{"href":"http://meetings.nyintergroup.org/locations/220-west-houston-street?d=any&v=list"},
  "meetingNotes":"Pitch meeting",
  "locationNotes":"2nd Floor. Between 6th Avenue & Varick Street.",
  "formatAddress":"220 W Houston St, New York, NY 10014, USA",
  "latLng":{"lat":40.7287153,"lng":-74.004578}
}
```
2. after: 
```json
{
  "latLng":{"lat":40.7208017,"lng":-74.0048389},
  "meetingName":"Room for Improvement ",
  "dayOfTheWeek":"Sunday",
  "startTime":"07:30",
  "endTime":"08:30",
  "region":"Tribeca",
  "location":"Hazelden Tribeca",
  "locationNotes":"Between Lispenard and Canal",
  "sameMeetPlace":"Hazelden Tribeca(12 other meetings at this location)",
  "formatAddress":"283 W Broadway, New York, NY 10013, USA",
  "types":"Open, Topic Discussion, Wheelchair Accessible",
  "group":"ROOM FOR IMPROVEMENT (:II) (Group #4X)",
  "meetingNotes":"undefined",
  "detailedPageLink":"http://meetings.nyintergroup.org/meetings/room-for-improvement-ii-2?d=any&v=list",
  "sameMeetPlaceLink":"http://meetings.nyintergroup.org/locations/hazelden-tribeca?d=any&v=list"
}
```
# process

## 1BASIC.js
#### objectives
1. save basic info of [AAmeeting page](http://meetings.nyintergroup.org/)

   output:
```json
{
  "dayOfTheWeek":"Sunday",
  "meetingName":"Midnite",
  "address":"220 West Houston Street",
  "region":"Greenwich Village",
  "types":"Candlelight, Open, Topic Discussion",
  "location":"220 West Houston Street",
  "link":"http://meetings.nyintergroup.org/meetings/midnite-2?d=any&v=list"
}
```
## 2Detailed.js
#### objectives
1. scrape each meetings detailed info through the detailedPage link scraped before.

   output:
```json
{
  "dayOfTheWeek":"Sunday",
  "meetingName":"Midnite",
  "address":"220 West Houston Street",
  "region":"Greenwich Village",
  "types":"Candlelight, Open, Topic Discussion",
  "location":"220 West Houston Street",
  "link":"http://meetings.nyintergroup.org/meetings/midnite-2?d=any&v=list",
  "startTime":"2:00 am",
  "endTime":" 3:15 am",
  "group":"MIDNITE (Group #12920)",
  "apiFeed":"\t\t\t\t\t\t\t220 West Houston StreetNew York, NY 10014",
  "sameMeetPlace":"220 West Houston Street(49 other meetings at this location)\t\t\t\t\t\t\t",
  "sameMeetPlaceLink":{"href":"http://meetings.nyintergroup.org/locations/220-west-houston-street?d=any&v=list"},
  "meetingNotes":"Pitch meeting",
  "locationNotes":"2nd Floor. Between 6th Avenue & Varick Street."
}
```

## 3API.js
#### objectives
1. request google map API ,get the formated info and geocode. 

   output:
```json
{
  "dayOfTheWeek":"Sunday",
  "meetingName":"Midnite",
  "address":"220 West Houston Street",
  "region":"Greenwich Village",
  "types":"Candlelight, Open, Topic Discussion",
  "location":"220 West Houston Street",
  "link":"http://meetings.nyintergroup.org/meetings/midnite-2?d=any&v=list",
  "startTime":"2:00 am",
  "endTime":" 3:15 am",
  "group":"MIDNITE (Group #12920)",
  "apiFeed":"220 West Houston StreetNew York, NY 10014",
  "sameMeetPlace":"220 West Houston Street(49 other meetings at this location)\t\t\t\t\t\t\t",
  "sameMeetPlaceLink":{"href":"http://meetings.nyintergroup.org/locations/220-west-houston-street?d=any&v=list"},
  "meetingNotes":"Pitch meeting",
  "locationNotes":"2nd Floor. Between 6th Avenue & Varick Street.",
  "formatAddress":"220 W Houston St, New York, NY 10014, USA",
  "latLng":{"lat":40.7287153,"lng":-74.004578}
}
```

## 4cleanData.js
#### objectives
1. order & clean dataset to be ready to put into mongoDB. 

   output:
   
   1. Before:
```json
{
  "latLng":{"lat":40.7287153,"lng":-74.004578},
  "meetingName":"Midnite",
  "dayOfTheWeek":"Sunday",
  "startTime":"02:00",
  "endTime":"03:15",
  "region":"Greenwich Village",
  "location":"220 West Houston Street",
  "locationNotes":"2nd Floor. Between 6th Avenue & Varick Street.",
  "sameMeetPlace":"220 West Houston Street(49 other meetings at this location)",
  "formatAddress":"220 W Houston St, New York, NY 10014, USA",
  "types":"Candlelight, Open, Topic Discussion",
  "group":"MIDNITE (Group #12920)",
  "meetingNotes":"Pitch meeting",
  "detailedPageLink":"http://meetings.nyintergroup.org/meetings/midnite-2?d=any&v=list",
  "sameMeetPlaceLink":"http://meetings.nyintergroup.org/locations/220-west-houston-street?d=any&v=list"
}
```