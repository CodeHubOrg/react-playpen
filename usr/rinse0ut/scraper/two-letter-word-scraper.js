var request  = require('request');
var cheerio  = require('cheerio');
var jsonfile = require('jsonfile');
var url      = 'http://www.wineverygame.com/scrabble-word-list-twoletters.php';
var words    = [];

function scrapeWord(td) {
    var txt  = $(td).text().split(' - ');
    var word = txt[0];
    var def  = txt[1];

    if (def === undefined)
        return true;
    def = def.replace(/(\r\n|\n|\r)/gm,"");

    words.push({
        "word": word,
        "def": def
    });
}

request(url, function(err, res, body) {
    if (err)
        return console.error(err);

    $ = cheerio.load(body);

    $('td').each(function(i, td) {
        scrapeWord(td);
    });

    jsonfile.writeFile('two-letter-words.json', words, {spaces: 2}, function(err) {
        console.error(err);
    });
});
