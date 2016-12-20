## Final_assignment_02

runtime API for Sensor data.

table schema
- drinkdate: date;
- drinkingtime: time;
- drinktimestamp: timestamp;
- drink: boolean;
- drinkamount: int2.

sensor read:
- because sensor is not extremely accuracy, so I applyed some statistic calculation, calculate mean, median and standard deviation to get the error level and what is the true value when the bottle is full/empty

```js
/*********************
empty bottle:
--------mean:975.1818181818181
--------median:975
--------mode:970 985
--------std: 0.2990984813116243
--------confident interval at 95%: 975 ~ 975.3

conclusion: 975 for empty bottle.


full bottle(450ml):
--------mean:1005.6
--------median:1006
--------mode:1007
--------std: 0.060164187975219795

conclusion: 1005 for empty bottle.

*********************/
```
#### Design sketch:
UI of drinking data visualization.
![mockup](https://raw.githubusercontent.com/Jiahao01121/data-structures/master/weekly_assignment_07/designSketch_02.jpg)

UI of drinking data visualization. after check expand, each row of data gonna show the detailed time.
![mockup](https://raw.githubusercontent.com/Jiahao01121/data-structures/master/weekly_assignment_07/designSketch_01.jpg)

#### prototype for drinking data.
![screenshot](https://raw.githubusercontent.com/Jiahao01121/data-structures/master/Final_assignment_02/proto.jpeg)

#### code:
use socket io to pass data.
1. when page load, query data base and send 'history' data.
2. listen to the event "freashData", and pass new data to browser.

server side:
```js
/**************************************************************
                 socket.io
    Mainly two behaviour:
      1. when page load, query data base and send 'history' data.
      2. listen to the event "freashData", and pass new data to browser.
**************************************************************/
io.on('connection', function (socket) {
//when page load, query database to get all history data.
  pg.connect(conString, function(err, client, done) {
    if(err){return console.error('error fetching client from pool', err);}
    client.query(`SELECT * FROM drink`, function(err, result) {
      if (err) {return console.error('error running query', err);}
      done();
      socket.emit('activate',result.rows);
  });  //pg.query
  });  //pg.connect
//listen freashdata, and emit an event to pass incoming data to browser
  EmitData.on("freashData",function(incomingdata){
    socket.emit('responsive',incomingdata);
  })
});
```

client side:
```js
var socket = io('http://localhost:3000');

function show(month,date,year,time,value) {
  var btn = document.createElement("BUTTON");
  document.body.appendChild(btn);
  var para = document.createElement("P");
  var t = document.createTextNode(`${month}/${date}/${year} || ${time} || ${value}`);
  document.body.appendChild(btn);
  para.appendChild(t);
  document.body.appendChild(para);
}

socket.on('responsive', function (data) {
  var year = new Date(data.drinkdate).getFullYear();
  var month = new Date(data.drinkdate).getMonth();
  var date = new Date(data.drinkdate).getDate();
  console.log(data)
  // console.log(typeof data.drinktime);
  show(month,date,year,data.drinktime,data.drinkamount);
});

socket.on('activate', function (data) {
  for (var i = 0; i < data.length; i++) {
    // console.log(data[i])
    var year = new Date(data[i].drinkdate).getFullYear();
    var month = new Date(data[i].drinkdate).getMonth();
    var date = new Date(data[i].drinkdate).getDate();
    // console.log(month,date);
    show(month,date,year,data[i].drinktime,data[i].drinkamount)
  }
});
```
