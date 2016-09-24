var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var Queue = require('./Queue.js');
var Node = require('./Node.js');
var async = require('async');

var input = JSON.parse(fs.readFileSync('input.json', 'utf8'));
URL = "https://en.wikipedia.org"
url = 'http://www.imdb.com/title/tt1229340/';

var startVisited = {};
var targetVisited = {};
var startToVisit = new Queue();
var targetToVisit = new Queue();
var startingNode = new Node(URL + input['start']);
var targetNode = new Node(URL + input['end']);
var target = input['end'];
var found = false;
startToVisit.enqueue(startingNode);
targetToVisit.enqueue(targetNode);

async.whilst(
  function(){return (!startToVisit.isEmpty() && !found)},
  function(next){
    parent = startToVisit.dequeue();
    console.log("START Visiting new page:");
    console.log(parent.data);
    if (parent.parent){
      console.log("START The prior page was:");
      console.log(parent.parent.data);
    }
    request(parent.data, function(error, response, html){
      if(!error){
        var $ = cheerio.load(html);
        $('#mw-content-text p a').each(function(i, elem) {
          if($(this).not("[title*='not exist']").attr('title')) {
            var href = $(this).attr('href');
            if (href == target || targetVisited[href]) {
              console.log(href);
              console.log(target);
              console.log("START YUESSS");
              found = true;
              return false;
            }
            else if (startVisited[href]){
              // console.log("VISITED");
            } else {
              // console.log(URL + href);
              var child = new Node(URL + href);
              child.parent = parent;
              parent.child = child;
              startVisited[href] = child;
              startToVisit.enqueue(child);
            }
          }
        });
      } else {
        console.log("Error");
      }
      next();
    });
  },
  function(err) {
    console.log('DONE');
  }
)

request(url, function(error, response, html){
    if(!error){
        var $ = cheerio.load(html);

    var title, release, rating;
    var json = { title : "", release : "", rating : ""};

    $('.title_wrapper').filter(function(){
        var data = $(this);
        title = data.children().first().text();
        release = data.children().first().children().text();

        json.title = title;
        json.release = release;
    })

    $('.ratingValue').filter(function(){
        var data = $(this);
        rating = data.text();

        json.rating = rating;
    })
  }

  fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){

      console.log('File successfully written! - Check your project directory for the output.json file');

  })
});


