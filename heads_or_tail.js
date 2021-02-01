const fs = require('fs');
var minimist = require('minimist');
var _ = require('lodash');
var readline = require('readline');
let argv = require('minimist')(process.argv.slice(2));


var rand_toss = _.random(1, 2);

var rl = readline.createInterface({
  input: process.stdin, // ввод из стандартного потока
  output: process.stdout // вывод в стандартный поток
});

rl.question('Введите 1 для "ОРЛА" или введите 2 для "РЕШКИ"', function(answer) {
    answer = Number(answer);
    if (rand_toss === answer){
        result = 'Вы угадали ';
    } else {
        result ='Неправильно ';
    }
    console.log(result);
    console.log('На монете: ' + rand_toss, 'Вы выбрали: ' + answer);



    fs.appendFile('game_log.log', result + '\n', 'utf8', (error) => {
                if (error) throw error;
                console.log('результат сохранен в game_log.log');
            });


    rl.close();

});
