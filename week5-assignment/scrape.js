var fs = require("fs");
var request = require("request");
//query
var cheerio = require("cheerio");
var webpage = fs.readFileSync('page.html','utf8');
var $ = cheerio.load(webpage);
var pass = [];
// //save the website to local
// var scrapeUrl = 'http://meetings.nyintergroup.org/?d=any&v=list';
// request(scrapeUrl).pipe(fs.createWriteStream('page.html'));

//parsing

    $('#meetings_tbody').find('tr').children().each(function(i,elem){
        var structure = new Object();

        var a = function(className){
            if($(elem).attr("class") === className){
                structure.date = this.date;
                structure.time = this.time;
                structure.date = $(elem).children().html();
                structure.time = $(elem).contents().next().text();
            }
        };
        a('time');

        var b = function(className){
            if($(elem).attr("class") === className){
                structure.meetingName = this.meetingName;
                structure.meetingName = $(elem).contents().text().trim();
            }
        };
                b('name');

        var c = function(className){
            if($(elem).attr("class") === className){
                structure.address = this.address;
                structure.address = $(elem).text();
            }
        };
        c('address');
        var d = function(className){
            if($(elem).attr("class") === className){
                structure.region = this.region;
                structure.region = $(elem).text();
            }
        };
        d('region');
        var e = function(className){
            if($(elem).attr("class") === className){
                structure.types = this.types;
                structure.types = $(elem).text();
            }
        };
        e('types');
        
        pass.push(structure);
    });//each
