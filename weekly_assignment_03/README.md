## output.json:
```JSON
[{"address":"273 Bowery, New York, NY 10002, USA","location":{"lat":40.7237496,"lng":-73.992395}},{"address":"232 W 11th St, New York, NY 10014, USA","location":{"lat":40.7360929,"lng":-74.0027593}},{"address":"283 W Broadway, New York, NY 10013, USA","location":{"lat":40.7208017,"lng":-74.0048389}},{"address":"232 W 11th St, New York, NY 10014, USA","location":{"lat":40.7360929,"lng":-74.0027593}},{"address":"220 W Houston St, New York, NY 10014, USA","location":{"lat":40.7287153,"lng":-74.004578}},{"address":"253 Centre St, New York, NY 10013, USA","location":{"lat":40.7206388,"lng":-73.9980605}},{"address":"273 Bowery, New York, NY 10002, USA","location":{"lat":40.7237496,"lng":-73.992395}},{"address":"487 Hudson St, New York, NY 10014, USA","location":{"lat":40.73261979999999,"lng":-74.0068029}},{"address":"292 Henry St, New York, NY 10002, USA","location":{"lat":40.71371430000001,"lng":-73.983033}},{"address":"232 W 11th St, New York, NY 10014, USA","location":{"lat":40.7360929,"lng":-74.0027593}},{"address":"141 Henry St, New York, NY 10002, USA","location":{"lat":40.7134775,"lng":-73.9906663}},{"address":"220 W Houston St, New York, NY 10014, USA","location":{"lat":40.7287153,"lng":-74.004578}},{"address":"New York, NY, USA","location":{"lat":40.7127837,"lng":-74.0059413}},{"address":"50 Perry St, New York, NY 10014, USA","location":{"lat":40.7355145,"lng":-74.0031001}},{"address":"232 W 11th St, New York, NY 10014, USA","location":{"lat":40.7360929,"lng":-74.0027593}},{"address":"224 Waverly Pl, New York, NY 10014, USA","location":{"lat":40.7360517,"lng":-74.0020724}},{"address":"154 Sullivan St, New York, NY 10012, USA","location":{"lat":40.7272453,"lng":-74.001408}},{"address":"273 Bowery, New York, NY 10002, USA","location":{"lat":40.7237496,"lng":-73.992395}},{"address":"371 6th Ave, New York, NY 10014, USA","location":{"lat":40.732613,"lng":-74.00070509999999}},{"address":"155 Sullivan St, New York, NY 10012, USA","location":{"lat":40.727182,"lng":-74.001238}},{"address":"7 E 10th St, New York, NY 10003, USA","location":{"lat":40.7332774,"lng":-73.99463109999999}},{"address":"232 W 11th St, New York, NY 10014, USA","location":{"lat":40.7360929,"lng":-74.0027593}},{"address":"81 Christopher St, New York, NY 10014, USA","location":{"lat":40.7336975,"lng":-74.0035917}},{"address":"273 Bowery, New York, NY 10002, USA","location":{"lat":40.7237496,"lng":-73.992395}},{"address":"232 W 11th St, New York, NY 10014, USA","location":{"lat":40.7360929,"lng":-74.0027593}},{"address":"232 W 11th St, New York, NY 10014, USA","location":{"lat":40.7360929,"lng":-74.0027593}},{"address":"83 Christopher St, New York, NY 10014, USA","location":{"lat":40.7336761,"lng":-74.0037703}},{"address":"220 W Houston St, New York, NY 10014, USA","location":{"lat":40.7287153,"lng":-74.004578}},{"address":"273 Bowery, New York, NY 10002, USA","location":{"lat":40.7237496,"lng":-73.992395}}]
```






## #node:
node can only process either 'string' or buffer, so if we want to process a object or array, we need to set **stringify**
```js
async.eachSeries(address,
//iteratee(functional code block, all the operations occoured in this function)
function(address,callback){
        request("https://maps.googleapis.com/maps/api/geocode/json?address=" + address + ", +NY" + "&key=" + MyKey + "&language=en",function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    //use a object to storage the jsonfile(which is a collection of objects) which request form googleAPI and parse it to let js know this is a JSON format info.
                      finalOutPut.address = JSON.parse(body).results[0].formatted_address;
                      finalOutPut.location = JSON.parse(body).results[0].geometry.location;
                    //out put the selected information to a json file.
                      fs.appendFile('week3-assignment/address.json',JSON.stringify(finalOutPut),'utf8',(err) => {
                          if (err){ throw err}

                      })
                }
        });
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
        console.log('All address have been processed successfully');
    }   
});
```

####async.eachSeries()
http://caolan.github.io/async/docs.html#.each

####Write objects into file with Node.js
http://stackoverflow.com/questions/21976567/write-objects-into-file-with-node-js
