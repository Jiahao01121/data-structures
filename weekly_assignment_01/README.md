## weekly_01_assignment

#### index.js
- extract html and named each html file.
- use request module.

core code:
```
//define page
(function(){
    for (var i = 1; i <= 10; i++) {
      if(i!==10){
        var a =`http://visualizedata.github.io/datastructures/data/m0${i}.html`;
        page[i] = a
      }
      if(i === 10){
        var b =`http://visualizedata.github.io/datastructures/data/m${i}.html`;
        page[i] = b
      }
    }
})()

//request
for (var j = 1; j < 11; j++) {
  let i = j
  request(page[i],function(err,res,body){
    console.log(page);
    if(err) throw err
    fs.writeFileSync(`AApage${i}.html`,body,"utf8");
  })
}
```
