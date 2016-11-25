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
var request = require("request");
var data = read.readJSONFile('from2Detailed.json');
var async = require('async'); 
var apiKey = process.env.GOOGLEMAPAPIKEY;

for (var i = 0; i<data.length;i++){
    if(data[i].apiFeed === undefined){
        data.splice(i,1); //remove wrong data (151 2413 2424 3639)
    } ;
    data[i].apiFeed = data[i].apiFeed.trim();

}

async.eachSeries(data,function(item,callback){
    request("https://maps.googleapis.com/maps/api/geocode/json?address=" + item.apiFeed + "&key=" + apiKey + "&language=en",function (error, response, body) {
        if (!error && response.statusCode == 200){
            item.formatAddress = JSON.parse(body).results[0].formatted_address;
            item.latLng = JSON.parse(body).results[0].geometry.location;
            console.log(item)
        }
    });
    setTimeout(callback,2000);},function(err){
    if( err ){
        console.log('A address failed to process');
    }
        fs.writeFileSync('from3API.json',JSON.stringify(data))
        console.log('All address have been processed successfully');
    }   
); //async