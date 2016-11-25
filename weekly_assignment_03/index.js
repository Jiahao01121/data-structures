const request = require("request"),
      fs = require("fs"),
      cheerio = require("cheerio"),
      async = require('async'),
      MyKey = process.env.MYKEY;

var dataset = fs.readFileSync("10pages/AApage2.html");
var $ = cheerio.load(dataset);
var address = [];
var finalArray = [];

//-----change the format of the address to the form that fit GoogleAPI like:  detail1 + detail2 + detail3
$("td").each(function(i,elem){
        if ($(elem).attr("style")=="border-bottom:1px solid #e3e3e3; width:260px"){
        var data1 = $(elem).contents().get(6).nodeValue;
address.push(data1.trim().split(',')[0].split(' ').join('+'));
        }
});

// request geo info from goole API
// async.eachSeries(collection, iteratee, callback)
async.eachSeries(address,
//iteratee(functional code block, all the operations occoured in this function)
function(address,callback){
        request("https://maps.googleapis.com/maps/api/geocode/json?address=" + address + ", +NY" + "&key=" + MyKey + "&language=en",function (error, response, body) {
                if (!error && response.statusCode == 200) {
//use a object to storage the jsonfile(which is a collection of objects) which request form googleAPI and parse it to let js know this is a JSON format info.
                      var finalOutPut = new Object();
                      finalOutPut.address = JSON.parse(body).results[0].formatted_address;
                      finalOutPut.location = JSON.parse(body).results[0].geometry.location;
                              finalArray.push(finalOutPut)
                    console.log(finalOutPut)
                    //out put the selected information to a json file.
                }
        });  //request
        setTimeout(callback,2000);
},
//callback (not functional, just tell me this iteration running successfully)
function(err)
{
    if( err )
    {
        console.log('A address failed to process');
    }
    else
    {
        console.log(finalArray);
        fs.writeFileSync('output.json',JSON.stringify(finalArray))
        console.log('All address have been processed successfully');

    }
});
