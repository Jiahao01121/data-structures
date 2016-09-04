var fs = require("fs");
var request = require("request");
var page = [
        "http://visualizedata.github.io/datastructures/data/m01.html",
        "http://visualizedata.github.io/datastructures/data/m02.html",
        "http://visualizedata.github.io/datastructures/data/m03.html",
        "http://visualizedata.github.io/datastructures/data/m04.html",
        "http://visualizedata.github.io/datastructures/data/m05.html",
        "http://visualizedata.github.io/datastructures/data/m06.html",
        "http://visualizedata.github.io/datastructures/data/m07.html",
        "http://visualizedata.github.io/datastructures/data/m08.html",
        "http://visualizedata.github.io/datastructures/data/m09.html",
        "http://visualizedata.github.io/datastructures/data/m10.html"];
      
  for(var i=0 ;i<page.length ; i++){
     switch (i)
{
  
case 0:


request(page[0], function (error, response, body) {
  if (!error && response.statusCode == 200) {
    fs.writeFileSync('/home/ubuntu/workspace/data/syllabus1.txt', body);
  }
  else {console.error('request failed')}
});
break;
case 1:


request(page[1], function (error, response, body) {
  if (!error && response.statusCode == 200) {
    fs.writeFileSync('/home/ubuntu/workspace/data/syllabus2.txt', body);
  }
  else {console.error('request failed')}
});
break;
case 2:

request(page[2], function (error, response, body) {
  if (!error && response.statusCode == 200) {
    fs.writeFileSync('/home/ubuntu/workspace/data/syllabus3.txt', body);
  }
  else {console.error('request failed')}
});
break;
case 3:
var request = require('request');
var fs = require('fs');

request(page[3], function (error, response, body) {
  if (!error && response.statusCode == 200) {
    fs.writeFileSync('/home/ubuntu/workspace/data/syllabus4.txt', body);
  }
  else {console.error('request failed')}
});
break;
case 4:
request(page[4], function (error, response, body) {
  if (!error && response.statusCode == 200) {
    fs.writeFileSync('/home/ubuntu/workspace/data/syllabus5.txt', body);
  }
  else {console.error('request failed')}
});
  break;
case 5:
  request(page[5], function (error, response, body) {
  if (!error && response.statusCode == 200) {
    fs.writeFileSync('/home/ubuntu/workspace/data/syllabus6.txt', body);
  }
  else {console.error('request failed')}
});
  break;
case 6:
request(page[6], function (error, response, body) {
  if (!error && response.statusCode == 200) {
    fs.writeFileSync('/home/ubuntu/workspace/data/syllabus7.txt', body);
  }
  else {console.error('request failed')}
});  break;
  case 7:
request(page[7], function (error, response, body) {
  if (!error && response.statusCode == 200) {
    fs.writeFileSync('/home/ubuntu/workspace/data/syllabus8.txt', body);
  }
  else {console.error('request failed')}
});  break;
  case 8:
request(page[8], function (error, response, body) {
  if (!error && response.statusCode == 200) {
    fs.writeFileSync('/home/ubuntu/workspace/data/syllabus9.txt', body);
  }
  else {console.error('request failed')}
});  break;
  case 9:
request(page[9], function (error, response, body) {
  if (!error && response.statusCode == 200) {
    fs.writeFileSync('/home/ubuntu/workspace/data/syllabus10.txt', body);
  }
  else {console.error('request failed')}
});
break;
}
     

  }
   
  