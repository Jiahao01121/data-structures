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
var async = require("async");
var fs = require("fs");
var request = require("request")
var cheerio = require("cheerio");
var data = read.readJSONFile('from1JS.json');



async.eachSeries(data,
  function(item,callback) {
     request(item.link,function(error,response,body){
      if(error){throw error}
      
        fs.writeFileSync('0.html',body,'utf8');
        var detailedPage = fs.readFileSync('0.html','utf8');
        var $ = cheerio.load(detailedPage);
        item.startTime = $('.col-md-4').children().find('dd').first().find('time').text();
        item.endTime = $('.col-md-4').children().find('dd').first().text().trim().split('to')[1];
        item.group = $('.col-md-4').children().find('dd').eq(2).text().trim();
        item.apiFeed = $('.col-md-4').children().find('dd').eq(1).text().trim().split(/\n/)[1];
        item.sameMeetPlace = $('.col-md-4').children().find('dd').eq(1).text().trim().split(/\n/)[0];
        item.sameMeetPlaceLink = $('.col-md-4').children().find('dd').eq(1).find('a').attr();
        
$('.col-md-4').find('dt').each(function(i,elem){
    var a = function (){
    // console.log($(elem).next().next().html())
        if($(elem).next().next().html() === 'Location Notes' && i == 4){
                // console.log($(elem).next().next().next().text())
              item.locationNotes = $(elem).next().next().next().text();
        }
        if ($(elem).next().next().html() !== 'Location Notes'  && i == 4){
        item.locationNotes = 'undefined';
        }
    };
var b = function(){
    item.meetingNotes = "undefined";
};
    
    if($(elem).html() === 'Meeting Notes' && i == 4){
        item.meetingNotes = $(elem).next().text();
            a();
    }

    if ($(elem).html() === 'Location Notes'  && i == 4){
        item.locationNotes = $(elem).next().text();
        b();
    }
    if($(elem).html() !== 'Meeting Notes' && $(elem).html() !== 'Location Notes'&& i == 4){
            item.meetingNotes = "undefined";
            item.locationNotes = 'undefined';
    }
});//meetingNotes and locationNotes
console.log(item)
     });//request
  setTimeout(callback,2000);
  }//iteratee
  ,
function(err) 
{
    if( err ) 
    {
        console.log(err);
    } 
    else 
    {
        console.log('have been processed successfully');
        
        
        fs.writeFileSync('from2Detailed.json',JSON.stringify(data));
        console.log(data);
    }   
}//callback
);//async;
