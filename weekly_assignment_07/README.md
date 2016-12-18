## Design sketch:
- UI of drinking data visualization.

![mockup](https://raw.githubusercontent.com/Jiahao01121/data-structures/master/weekly_assignment_07/designSketch_02.jpg)

- UI of drinking data visualization. after check expand, each row of data gonna show the detailed time.

![mockup](https://raw.githubusercontent.com/Jiahao01121/data-structures/master/weekly_assignment_07/designSketch_01.jpg)

## Data structure:
- value field represent the weight of the bottle and each time's drinking amount is calculate by the difference value of two document.
```json
[
   {
    "date" : "2016-11-05T02:00:24.112Z",
    "drink": true,
    "value": 1201
   },
   {
     "date" : "2016-11-05T02:02:54.112Z",
     "drink": false,
     "value": 0
   },
   {
     "date" : "2016-11-05T02:03:24.112Z",
     "drink": true,
     "value": 1178
   },
   {
     "date" : "2016-11-05T02:22:31.112Z",
     "drink": false,
     "value": 0
   }
]
```
