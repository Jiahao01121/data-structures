# Data structures

###### index
>  weekly_assignment_01  
>  weekly_assignment_02  
>  weekly_assignment_03   
>  weekly_assignment_04   
>  weekly_assignment_05   
>  weekly_assignment_06   
>  weekly_assignment_07   
>  weekly_assignment_08   
>  weekly_assignment_09   
>  weekly_assignment_10   
>  final_assignment_01    
>  final_assignment_02


### weekly_assignment_01:
###### requirements
- using Node.js and node package (request)in cloud9 to scrape each of the ten "Meeting List Agenda" pages for Manhattan.
- For each of the ten files you requested, save the body as a text file to your "local" environment in Cloud9 (using Node.js)
- Study the HTML structure and begin to think about how you might parse these files (Document Object Model) to extract the relevant data for each meeting.

###### source file tree
```
weekly_assignment_01
├── README.md (detailed info about weekly_assignment_01)
├── index.js (entry point)
├── package.json
│
├── 10pages (ten html file request from AAmeeting URL)
│   ├── AApage1.html
│   ├── AApage3.html
│   ├── AApage4.html
│   ├── AApage5.html
│   ├── AApage6.html
│   ├── AApage7.html
│   ├── AApage8.html
│   ├── AApage9.html
│   └── AApage10.html
│
└── node_modules
    └── request
```
### weekly_assignment_02:

###### requirements
- Using Node.js, read one of the text files that you wrote for last week's assignment. Store the contents of the file in a variable.
- Write a program in Node.js that will print to the console the street address for every meeting in your text file.

###### source file tree
```
weekly_assignment_02
├── README.md (detailed info about weekly_assignment_02)
├── index.js (entry point)
├── package.json
│
├── 10pages (ten html file request from AAmeeting URL)
│   ├── AApage1.html
│   ├── AApage3.html
│   ├── AApage4.html
│   ├── AApage5.html
│   ├── AApage6.html
│   ├── AApage7.html
│   ├── AApage8.html
│   ├── AApage9.html
│   └── AApage10.html
│
└── node_modules
    ├── cheerio
    └── request
```
### weekly_assignment_03:

###### requirements
-  instead of logging the addresses to the console, push them to an array so that it will be easier to access the data for your work on this assignment.
- Write a program that makes a request to the Google Maps API for each address, using the data you scraped in the last assignment.
- You'll need to do some work on the address data to prepare them for the API queries. For example, the parsed value "50 Perry Street, Ground Floor," should be modified to "50 Perry Street, New York, NY". And for use in the Google Maps API, it should be further modified to 50+Perry+Street,+New+York,+NY. The addresses are messy and may yield weird results from the API response. Don't worry too much about this right now. But, start to think about it.
-  final output should be an array that contains an object for each meeting group. The array should have a length equal to the number of meetings. Each object should hold the relevant data for each meeting group. For now, we're focusing on the addresses and their geocoordinates.

###### source file tree
```
weekly_assignment_03
├── README.md (detailed info about weekly_assignment_03)
├── index.js (entry point)
├── output.json (the data output)
├── package.json
│
├── 10pages (ten html file request from AAmeeting URL)
│   ├── AApage1.html
│   ├── AApage3.html
│   ├── AApage4.html
│   ├── AApage5.html
│   ├── AApage6.html
│   ├── AApage7.html
│   ├── AApage8.html
│   ├── AApage9.html
│   └── AApage10.html
│
└── node_modules
    ├── cheerio
    ├── async
    └── request
```
### weekly_assignment_04:

###### requirements
- Start MongoDB by opening a new terminal window in your Cloud 9 workspace and running the command ./mongod
- In the Mongo shell, create and switch to a new database for the data you prepared in the previous assignment.
- In this new database, create a new collection that will hold a "document" for each "meeting".
- Use the mongodb module in Node to insert these documents to the collection you created in the database you created.

###### source file tree
```
weekly_assignment_04
├── README.md (detailed info about weekly_assignment_04)
├── index.js (entry point)
├── output.json (the data output)
│
├── data (mongoDB database)
│   ├── ..
│   └── diagnostic.data
│       └──..
│
└── node_modules
    └── mongodb
```
### weekly_assignment_05:

###### requirements
- Revisit your previous assignments and modify them to expand the data you are collecting to include all available information (about each meeting group and the meetings they hold each week)
- Write all this data to a Mongo database, having decided upon your [unit of analysis and appropriate data structures](http://www.socialresearchmethods.net/kb/unitanal.php)
- Using the aggregation pipeline, write a query that returns all meetings that start on Tuesdays at or after 7:00pm. Include relevant information about the meeting group, the location, special instructions, and details about the meetings.

###### source file tree
```
weekly_assignment_05
├── README.md (detailed info about weekly_assignment_05)
├── mongo_index.js (entry point)
├── output.json (the data output from previous assignment)
├── aggregationoutput.json (the aggregation pipeline that only show meetings after 19:00 Tuesday)
├── package.json
│
├── data (mongoDB database)
│   ├── ..
│   └── diagnostic.data
│       └──..
│
└── node_modules
    └── mongodb
```
### weekly_assignment_06:

###### requirements
- You're going to continue working with the AA data you scraped, parsed, and augmented. You will continue to clean the "raw" data as you encounter its errors and limitations. As your cleaning tasks become more complex, they should be dealt with inside functions.
- A function that takes a meeting name from your web scrape and returns a cleanly formatted meeting name. The function should:
 1. Remove redundancies.
 2. Remove unnecessary punctuation, such as parentheses, hyphens, redundant commas, and symbols.
 3. Correct misspellings.
- A function that takes address data from your web scrape and returns a formatted address that is appropriate for input to the Google Geocoding API. The function should:
 1. Remove unnecessary address elements such as floor, room number, or directions.
 2. Remove unnecessary punctuation, such as parentheses, hyphens, redundant commas, and symbols.
 3. Correct misspellings.

 ###### source file tree
 ```
 weekly_assignment_06
 ├── README.md (detailed info about weekly_assignment_06)
 ├── package.json
 ├── page.html
 ├── 0.html
 │
 ├── 1BASIC.js (first stage: save basic info of AAmeeting page.)
 ├── from1JS.json ((FIRST STAGE) output from 1BASIC.js)
 │
 ├── 2Detailed.js (scrape each meetings detailed info through the detailedPage link scraped before.)
 ├── from2Detailed.json ((SECOND STAGE) output from 2Detailed.js)
 │
 ├── 3API.js (request google map API ,get the formated info and geocode.)
 ├── from3API.json ((THIRD STAGE) output from 3API.js)
 │
 ├── 4cleanData.js (order & clean dataset to be ready to put into mongoDB.)
 ├── from4Cleaned.json ((FINAL STAGE) output from 4cleanData.js)
 │
 └── node_modules
     ├── cheerio
     ├── async
     ├── request
     └── mongodb
 ```

 ### weekly_assignment_07:

 ###### requirements
- Switching gears from previous assignments, you will use a microcontroller and sensors to collect and log data to your local computer. You will also design (in concept only) an interactive visualization of the data you will collect from the sensor.
- Create a design sketch PDF.
- Demonstrate data values generated by your sensor.

###### source file tree
```
weekly_assignment_07
├── README.md (detailed info about weekly_assignment_07)
├── designSketch_01.jpg
└── designSketch_02.jpg
```

### weekly_assignment_08:

###### requirements
- Create a SQL database (using a managed database service) and begin writing your sensor data to it.
- Use the johnny-five module in Node.
- Use the pg module in Node to use SQL to define (using appropriate data types), manipulate, and query your data in the AWS PostgreSQL database you created in class.

###### source file tree
```
weekly_assignment_08
├── README.md (detailed info about weekly_assignment_08)
├── index.js (entry point)
├── package.json
│
├── data (data collected on sensor)
│   ├── data_THU.json (drinking data collected on Thursday)
│   ├── data_FRI.json (drinking data collected on Friday)
│   └── data_SAT.json (drinking data collected on Saturday)
│       └──..
│
└── node_modules
    ├── pg
    ├── epoch
    └── async
```

### weekly_assignment_09:

###### requirements
- Modify your scripts from Weekly Assignment 8 so that you are writing data from your sensor directly to the database (the writes to the database should be consistent with your design of the front-end interface, whether based on a trigger and/or a reasonable interval).
- write the SQL query or queries that will retrieve and transform the data to supply to your front-end interface design.

###### source file tree
```
weekly_assignment_09
├── README.md (detailed info about weekly_assignment_09)
├── index.js (entry point)
├── calculation_of_sensor_read.js (statistic calculation of sensor read)
├── package.json
│
└── node_modules
    ├── pg
    ├── epoch
    └── johnny-five
```

### weekly_assignment_10:

###### requirements
- Modify your work from Weekly Assignments 6 and 9 so that your node instances for these assignments are functioning as web servers. Your data should be queried on web requests and the response should be a JSON document with the relevant data. Use http.createServer in Node’s http module to create a Server class. Continue using the mongodb and pg drivers to interface with your databases.

- Requests using these URLs should return JSON files with the relevant data for each of your final projects.

###### source file tree
```
weekly_assignment_10
├── README.md (detailed info about weekly_assignment_10)
├── mongo_index.js (mongoDB query entry point)
├── output.json (the AA meeting data output from previous assignment)
├── postgre_index.json (postgre query entry point)
├── drinkingData.jpg (API screenshot)
├── AAmeeting.jpg (API screenshot)
├── package.json
│
├── data (mongoDB database)
│   ├── ..
│   └── diagnostic.data
│       └──..
│
└── node_modules
    ├── pg
    ├── socketio
    └── mongodb
```


### final_assignment_01:

###### requirements
- You will expand on weekly assignments one through six to scrape New York's AA Meeting List to capture, clean, and store all meetings in Manhattan (zones one through ten). The meetings data should be stored in and accessible through MongoDB. You will connect the MongoDB query output to Google Maps API to display meetings as map markers, with Info windows that show all relevant information about the meeting(s) at each marker.

- Some questions that may arise as you bind the data to the end-user interface:
 1. What information does the end user need? How? Why?
 2. From the data on AA's meeting list, which data are relevant for display in this project? How should it be displayed?
 3. What does a map marker represent? A meeting group? A meeting? A location?
 4. What is the minimum amount of data that can be queried to provide the necessary data for the visual representation?
