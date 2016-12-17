## output.json:
- just an object for example

```JSON
{
  "address" : "273 Bowery, New York, NY 10002, USA",
  "location" : {
                "lat":40.7237496,
                "lng":-73.992395
               }
}
```

## node:
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
