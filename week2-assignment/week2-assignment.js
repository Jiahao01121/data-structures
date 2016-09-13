var fs = require("fs");
var cheerio = require("cheerio");
var dataset = fs.readFileSync("data/syllabus2.txt");
var $ = cheerio.load(dataset);

$("td").each(function(i,elem){
        if($(elem).attr("style")=="border-bottom:1px solid #e3e3e3; width:260px")
        var data = $(elem).not('div').text();
        console.log(data);
});


