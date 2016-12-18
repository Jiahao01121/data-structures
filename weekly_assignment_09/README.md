## Sensor
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

## Database

table schema:

- drinkdate: date;
- drinkingtime: time;
- drinktimestamp: timestamp;
- drink: boolean;
- drinkamount: int2.

insert:

```js
ForceSensor.on("change",function(){
  var transfer = {};
  transfer.date = new Date().toISOString();
  transfer.drink = this.boolean;
  transfer.value = this.value;
  console.log(transfer)
  //insertData
  pg.connect(conString, function(err, client, done) {
    if(err){return console.error('error fetching client from pool', err);}

    client.query(`INSERT INTO drink VALUES ('${epoch(transfer.date).sqldate()}','${epoch(transfer.date).sqltime()}','${epoch(transfer.date).datetime()}',${transfer.drink},${transfer.value});`, function(err, result) {
        done();
        if (err) {return console.error('error running query', err);}
        console.log(result);
        console.log("success insert to db")
    });
  });  //pg.connect
});  //sensorON
```
