const http = require('http'),
      fs = require('fs'),
      socketio = require('socket.io'),
      pg = require('pg'),
      stream = require('stream');
//configuration postgreDB
var conString = "postgres://will:assignment@arduinodrink.ciluhrlkozis.us-west-2.rds.amazonaws.com:5432/arduinodrink"

//build server
var server = http.createServer(function(req,res){

//routing -01
  if(req.url == "/api/20161103"){
    //postgreDB stuff
    pg.connect(conString,function(err,client,done){
      if(err){return console.log("there is an error!",err)};
      client.query("SELECT * FROM drink WHERE drinkdate = '2016-11-03' ORDER BY drinktimestamp",
        function(err,result){
          if(err){return console.log("thiere is an error!",err)};
          done();

          console.log(result.rows);
          res.writeHead(200,{"content-type":"application/json"});
          res.end(JSON.stringify(result.rows));
        })  //query
    })  //DBconnect
  }

//routing -02
else if(req.url == "/api/20161104"){
    //postgreDB stuff
    pg.connect(conString,function(err,client,done){
      if(err){return console.log("there is an error!",err)};
      client.query("SELECT * FROM drink WHERE drinkdate= '2016-11-04' ORDER BY drinktimestamp",
        function(err,result){
          if(err){return console.log("thiere is an error!",err)};
          done();

          console.log(result.rows);
          res.writeHead(200,{"content-type":"application/json"});
          res.end(JSON.stringify(result.rows));
        })  //query
    })  //DBconnect
  }

//routing -03
else if(req.url == "/api/20161105"){
    //postgreDB stuff
    pg.connect(conString,function(err,client,done){
      if(err){return console.log("there is an error!",err)};
      client.query("SELECT * FROM drink WHERE drinkdate> '2016-11-04' ORDER BY drinktimestamp",
        function(err,result){
          if(err){return console.log("thiere is an error!",err)};
          done();

          console.log(result.rows);
          res.writeHead(200,{"content-type":"application/json"});
          res.end(JSON.stringify(result.rows));
        })  //query
    })  //DBconnect
  }
  //routing -04
  else if(req.url == "/api/laterthan20161105"){
      //postgreDB stuff
      pg.connect(conString,function(err,client,done){
        if(err){return console.log("there is an error!",err)};
        client.query("SELECT * FROM drink WHERE drinkdate> '2016-11-05' ORDER BY drinktimestamp",
          function(err,result){
            if(err){return console.log("thiere is an error!",err)};
            done();

            console.log(result.rows);
            res.writeHead(200,{"content-type":"application/json"});
            res.end(JSON.stringify(result.rows));
          })  //query
      })  //DBconnect
    }
  else{
    res.writeHead(200,{"content-type":"application/json"});
    res.end(
      JSON.stringify({"please vist localhost port on 3000":["/api/20161103","/api/20161104","/api/20161105","/api/laterthan20161105"],"to retrive json formatted information":null})
    )
      // "please go to localhost port on 3000 /api/20161103 or /api/20161104 or /api/20161105 or /api/laterthan20161105 to retrive json formatted information")
  }

}).listen(process.env.PORT , process.env.IP);
