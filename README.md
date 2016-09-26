# Wiki Racer
In short, this is a web scraper that uses breadth-first-search to reach an end article given urls to start and end articles.

## Installing
Make sure you have node installed with ```node -v```. Once you do, install required packages with ```npm install```. Finally, run ```node Wikirace.js``` to run the script.

## How to use
The script takes in 'input.json'. To change where you want to start/end, edit the start field to whatever article url you'd like to start from, and the end field to whatever article  url you'd like to end on.

After reaching the end article, the script will output a JSON file ('output.json') with a 'path' field that will have an array of the article urls leading to the end article. If there is no available path, the path field will be blank.

## Strategy - Improvements
The breadth first search approach is one that finds an optimal path from the start to target article if any exist.

Some initial strategies I considered included starting the tree crawl from both start and end points; obviously not usable because edges connecting articles are often unidirectional.

A heuristic approach could be based on strategy that Wiki-racers take.

One strategy is trying to find 'portal' articles, ones that expose the scraper to a larger quantity and variety of articles, and therefore increasing the probability of encountering the target. However, it's difficult to find a metric for what article makes a good 'portal' -- one possibility is shortness of the article name. E.g. an article with a shorter name would likely have a broader subject matter than a longer article name.

Another strategy is to use prior knowledge to select related articles; this is obviously much harder to turn into a heuristic. Some kind of latin roots dictionary could give etymologic relatedness, but even then it's not certain this would translate to wiki-relatedness.

## Packages used
### [Cheerio.js](https://github.com/cheeriojs/cheerio)
Exposes jQuery-like API to be used to process web pages.

### [async.js](https://github.com/caolan/async)
Provides workflow functions to work with asynchronous Javascript.
