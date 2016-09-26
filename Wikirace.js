/*

Wikirace.js

A web scraper that attemtps to go from a starting article to an ending article through breadth-first-search

*/

var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var Queue = require('./Queue.js');
var Node = require('./Node.js');
var async = require('async');

var URL = "https://en.wikipedia.org"

// Initialize pseudo-tree structure
var toVisit = new Queue();
var startingNode, finishNode;

// Initialize finish conditions
var found = false;
var start, target, outputJson;
var pathArray = [];

// Initialize visited-article dictionary
var visited = {};

// Take in input file and populate initialized vars
function processInput(){
  var input = JSON.parse(fs.readFileSync('input.json', 'utf8'));
  start = input['start'];
  target = input['end'];
  if (start == target){ found = true; }
  startingNode = new Node(start);
  toVisit.enqueue(startingNode);
  outputJson = {start : input['start'], end : input['end'], path : ""}
}

// Writes input to JSON
function writeOutput(json){
  fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
      console.log('File successfully written! - Check your project directory for the output.json file');
  })
}

processInput();
async.whilst(
  // Condition that allows running of the second function
  function(){return (!toVisit.isEmpty() && !found)},

  // Breadth first search function
  function(next){
    parent = toVisit.dequeue();
    request(parent.data, function(error, response, html){
      if(!error){

        // Make web page processable via jQuery API
        var $ = cheerio.load(html);
        // Filter out non-links
        $('#mw-content-text p a').each(function(i, elem) {
          if($(this).not("[title*='not exist']").attr('title')) {
            var href = $(this).attr('href');

            // Case where we found our target article
            if (URL + href == target) {
              found = true;
              // Set final node so we can trace back to root
              var finishNode = new Node(URL + href);
              finishNode.parent = parent;
              // Write the path array to our JSON
              finishNode.print(pathArray);
              outputJson['path'] = pathArray.reverse();
              return false;
            }

            // Skip if we've already visited this article
            else if (visited[href]){
              return false;
            }

            // Add children to tree in breadth-first order
            else {
              var child = new Node(URL + href);
              child.parent = parent;
              toVisit.enqueue(child);
              // Add href to dictionary of visited articles
              visited[href] = child;
            }
          }
        });
      }
      next();
    });
  },

  // Write out JSON output after condition is satisfied
  function(err) {
    writeOutput(outputJson);
  }
)




