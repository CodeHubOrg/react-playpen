var request  = require('request');
var cheerio  = require('cheerio');
var jsonfile = require('jsonfile');
var url      = 'http://www.word-buff.com/three-letter-words.html';
var words    = [];
var defs     = [];

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

    $('dt').each(function(i, dt) {
        var word = $(dt);
        var def  = word.next('dd');

        words.push({
            "word": word.text(),
            "def": def.text()
        });
    });

    console.log(words);

    // jsonfile.writeFile('three-letter-words.json', words, {spaces: 2}, function(err) {
    //     console.error(err);
    // });
});
