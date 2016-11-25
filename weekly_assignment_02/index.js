var fs = require("fs");
var cheerio = require("cheerio");
var dataset = fs.readFileSync("10pages/AApage2.html");
var $ = cheerio.load(dataset);
var week3 = [];

$("td").each(function(i,elem){
        if ($(elem).attr("style")=="border-bottom:1px solid #e3e3e3; width:260px"){
        var data1 = $(elem).contents().get(6).nodeValue
        var data2 = $(elem).contents().get(8).nodeValue

week3.push(data1.trim().split(',')[0])
        }
});

console.log(week3.length)


//second method to push address to the array

// var addresss = $("td").map(function(elem,i){
//          if ($(this).attr("style")=="border-bottom:1px solid #e3e3e3; width:260px"){
//          return $(this).contents().get(6).nodeValue
//          }}).toArray()
// for(var i = 0 ; i<addresss.length; i++){
//           addresss[i] = addresss[i].split('\r\n\t\t\t\t\t\t')[1].split(',')[0];
//
// }
// console.log(addresss)
