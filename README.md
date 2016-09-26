# Wiki Racer
In short, this is a web scraper that uses breadth-first-search to reach an end article given urls to a start and end article.

## Installing
Make sure you have node installed with '''node -v'''

## How to use
The script takes in input.json. To change where you want to start/end, edit the start field to whatever article url you'd like to start from, and the end field to whatever article  url you'd like to end on.

After reaching the end article, the script will output a JSON file (output.json) with a 'path' field that will have an array of the article urls leading to the end article. If there is no available path, the path field will be blank.

## Packages used
### [Cheerio]

