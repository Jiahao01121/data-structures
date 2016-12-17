## Data structures

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
├── mongo_index.js (entry point)
├── output.json (the data output)
├── package.json
│
└── node_modules
    └── mongodb
```
