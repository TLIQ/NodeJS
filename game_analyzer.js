const fs = require('fs');
var minimist = require('minimist');
var _ = require('lodash');
var readline = require('readline');
let argv = require('minimist')(process.argv.slice(2));
const util = require('util');

let win = 0;
let loss = 0;

const readFilePromise = util.promisify(fs.readFile);
readFilePromise('game_log.log', 'utf8')
    .then((fdata) => {
        data = fdata;
        word = fdata.split("\n");

        var corr_words = _.remove(word, function(n) {
          return n  != '';
        });

        for (var i = 0; i < corr_words.length; i++) {
            if (corr_words[i] == 'Неправильно ') {
                loss += 1;
            } else {
                win += 1;
            }
        }
        var output = {
            'Всего игр' : corr_words.length,
            'Прбеды' : win,
            'Проигрышей' : loss
        }

        console.log(output);
    })
    .catch((err) => {
        console.log('error:', err);
    });
