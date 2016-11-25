var read = { 
    readJSONFile :function (file){
        var data = fs.readFileSync(file,'utf8');
        return JSON.parse(data);
    },
    readHTMLFile :function(file){
        var data = fs.readFileSync(file,'utf8');
        return data;
    }
};
var fs = require("fs");
var cheerio = require("cheerio");
var webpage = read.readHTMLFile('page.html');
var $ = cheerio.load(webpage);
//organizing Data
var organized = [];
    $('#meetings_tbody').children().each(function(i,elem){
            var structure = {};
            structure.dayOfTheWeek = $(elem).find('.time').children().html();
            structure.meetingName = $(elem).find('.name').contents().text().trim();
            structure.address = $(elem).find('.address').text();
            structure.region = $(elem).find('.region').text();
            structure.types = $(elem).find('.types').text();
            structure.location = ($(elem).find('.location').text().trim());
           
            structure.link = $(elem).find('a').attr('href');
            organized.push(structure);
    });//each
fs.writeFileSync('from1JS.json',JSON.stringify(organized));

