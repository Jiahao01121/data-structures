var fs = require("fs");
var cheerio = require("cheerio");
var dataset = fs.readFileSync("week2-assignment/data/syllabus2.html");
var $ = cheerio.load(dataset);
var address = [];
var final = []

$("td").each(function(i,elem){
        if ($(elem).attr("style")=="border-bottom:1px solid #e3e3e3; width:260px"){
        var data1 = $(elem).contents().get(6).nodeValue
        var data2 = $(elem).contents().get(8).nodeValue

        // address.push(data1);   
console.log(data1.trim())


        }
});

// for(var i = 0; i<address.length; i ++ ){
//         final.push(address[i].split("\r\n\t\t\t\t\t\t")[1])
//         // console.log(address[i]);

// }
// console.log(final)


