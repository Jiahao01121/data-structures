#### #data model:
```JSON
{
  _id: ObjectId('57f2c8bcac0deec5018a09fd'),
  date: 'Saturday',
  time: ISODate('2016-10-04T20:30:00.666Z'),
  types: 'Big Book',
  region: 'Park Slope',
  address: '367 20th Street',
  meetingName: 'Greenwood'
}
```

#### #Query:
```js
db.aainfo.aggregate([
           {$project:
                {
                hour:{$hour : "$time"},
                min:{$minute:"$time"},
                date:"$date",
                types:"$types",
                 region:"$region",
                  address:"$address",
                  meetingName:"$meetingName",
                
                }
           },
           {$match:
                {
                date:"Tuesday",
                hour:{$gte : 19,$ne : 0  }
                }
            }
        ])
```
