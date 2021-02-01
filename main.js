// console.log(process.argv);

// var minimist = require('minimist');
//
// var argv = minimist(process.argv.slice(2), {
//     alias: {
//         help: 'h',
//         debug: 'd'
//     }
// });
// console.dir(argv);


// let logger;

// if (argv.debug || process.env.DEBUG) {
//     logger = console;
// }

// logger.log('debug');

// console.log(process.env);
// console.log(process.env.DEBUG);
// console.log(process.env.USERNAME);

// const obj = {
//     name: 'Vasya',
//     personal: {
//         age: 44,
//         birth: {
//             place: 'Saint-Petersburg',
//             date: 'xx.xx.xxxx',
//             x: {
//                 y: ''
//             }
//         }
//     }
// }
// console.time('debug');
// util = require('util');
// console.log(obj);
// console.log(JSON.stringify(obj, null, 5));
// console.log(util.inspect(obj, { depth: null }));
// console.dir(obj);

// console.dir(obj, { depth: 0 });
// console.timeEnd('debug');

// var readline = require('readline');
// var rl = readline.createInterface({
// input: process.stdin, // ввод из стандартного потока
// output: process.stdout // вывод в стандартный поток
// });
//
// rl.on('line', function (cmd) {
//     console.log('You just typed: '+cmd);
//     if (cmd === 'quit') {
//         rl.close();
//     }
// });
//
// rl.question('What is your favorite food?', function(answer) {
//     console.log('Oh, so your favorite food is ' + answer);
//     // rl.close();
// });

// const fs = require('fs');
//
// let data;
//
// fs.readFile('./package-lock.json', 'utf8', (err, fdata) => {
//     if (err) {
//         console.log(err);
//     } else {
//         data = fdata;
//         console.log(JSON.parse(data));
//     }
// });
// console.log('!!!');

// const util = require('util');
// const readFilePromise = util.promisify(fs.readFile);

// readFilePromise('package-lock.json', 'utf8')
//     .then((fdata) => {
//         data = fdata;
//         console.log(data);
//     })
//     .catch((err) => {
//         console.log('error:', err);
//     });

// const fs = undefined;

// const { Console } = require('console');

// let logger

// if (argv.debug || process.env.DEBUG) {
//     logger = console;
// } else {
//     logger = new Console(fs.createWriteStream('log.txt'), fs.createWriteStream('errors.txt'));
// }

// logger.log('info');
// logger.error('error');

// try {
//     const data = JSON.parse('}');
// } catch (err) {
//     console.log({ error: 'Incorrect request'});
// }

// console.log('!');
//     _.throttle
//     _.debounce
//     _.defer
