# Pizza-Meow
Hello, hello! I'm not sure how you found your way to this part of the internet but welcome! This was my first stab at canvas based off a tutorial from the folks at [codrops](http://tympanus.net/codrops/), referenced from one of the organizers of the [Prototype, Process, & Play conference](http://chicagocamps.org/events/).

I had a lot of fun running through this exercise. This is definitely not how the end-product of the codrops tutorial looked like, I just wanted to get a feel for the fundamentals so I deviated from the path and decided to add in a few of my favorite things: pizza, cats, gradients and space. :D

I did notice an inconsistency in the source code that I grabbed from the site. The section where you grab the five closest surrounding points had the following:


```
for(var i = 0; i < points.length; i++) {
              var closest = [];
              var p1 = points[i];
              for(var j = 0; j < points.length; j++) {
                var p2 = points[j]
                if(!(p1 == p2)) {
                  var placed = false;
                  for(var k = 0; k < 5; k++) {
                    if(!placed) {
                      if(closest[k] == undefined) {
                        closest[k] = p2;
                        placed = true;
                      }
                    }
                  }
                  for(var k = 0; k < 5; k++) {
                    if(!placed) {
                      if(getDistance(p1, p2) < getDistance(p1, closest[k])) {
                        closest[k] = p2;
                        placed = true;
                      }
                    }
                  }
                }
              }
            }
```
This would work to get the five closest points if all the coordinates in the points array were in order. If the coordinates are unordered you run into the possibility of replacing the first surrounding point that may not be the farthest out of the recorded five. For example, if we were traversing through an array with the following coordinates:

` [ {x:0,y:0}, {x:2,y:3}, {x:4,y:5}, {x:5,y:6}, {x:7,y:16}, {x:4,y:4}, {x:0,y:1} ]`


comparing the surrounding points to the coordinate `{x:5, y:5}`, with the above code we would have filled closest with the first five points. Now when we are comparing the remaining points to see if they are closer we would actually bump out `closest[0]` when we should actually bump out `closest[4]`. One way to solve this would be to track the comparison, another would be to sort the points array before we do any comparisons for proximity.
