# Sep.16.2016 coding note
Things last week not completed
1. Not completely persing out the pure address of AA meeting. 
  * contains a div of detailsBox (junk)
  * a span of "Wheerchair access" (junk)

### Sep.16.2016 revised
##### Enlightment by Rily's and Joshua's working file (many thanks!!!)

Cheerio features can only opreated on the exact root or selector;

### Bad Example
```js
$("td").each(function(i,elem)
        {
            if ($(elem).attr("style")=="border-bottom:1px solid #e3e3e3; width:260px")
            {
                var data = $(elem).not('div')
                console.log(data);
            }
        });
```

1. tips: if statement need to write in full formation.(which is u need to add backets after condition in parentheses.);
2. in code line *5*: the expression $(elem).not('div') is failed to run.
  *  Reason: because Cheerio features are only operates on the exact element. in this case, the elements have been selecte are the each *td* that parsed out by each iterator and if statements,the div in that *.not()* method is **the child of td**.

### Good Example
```js
$("td").each(function(i,elem)
        {
            if ($(this).attr("style")=="border-bottom:1px solid #e3e3e3; width:260px")
            {
                var data = $(elem).contents().not(function(i,el)
                    {
                        return $(this).attr('class') === 'detailsBox'
                    }).text();
                console.log(data);
            }
        });
```
1.  the $(elem) in a function/mathod can be replaced by *this*;
2.  **important**: in code line *5*; the $(this) only select every matched *td* element and need to use *.contents()* method to get the children of each *td* elemrent. [link](https://www.npmjs.com/package/cheerio#contents "Title"). after get each children of matched *td* element, *.not()* method can be used to exclude the element that does not meet requirements.
  * return value substitute the function as a parametre in the parentheses.





##Step2 
```js
        var data1 = $(elem).contents().get(6).nodeValue
```
**QUESTION1**
.get之后是不可以.text()的。
only can .nodeValue?
```js
console.log(data1.trim())
```