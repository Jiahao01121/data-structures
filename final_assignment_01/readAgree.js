var fs = require('fs');
var data = fs.readFileSync('aggre.json','utf8')
util = require("util");


data = JSON.parse(data,null,4);

for (let i = 0; i < data.length; i++) {
  for (var j= 0; j < data[i].samePlaceMeet.length; j++) {
    // if(data[i].samePlaceMeet[j].meetingName == 'Perry Street Workshop'){
      var obj_str = util.inspect(data[i],{ depth: null });
      console.log(obj_str);
    // }
  }
}
