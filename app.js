const fs = require('fs');
var minimist = require('minimist');
var _ = require('lodash');
var readline = require('readline');
let argv = require('minimist')(process.argv.slice(2));
const util = require('util');
var moment = require('moment');
var ansi = require('ansi')
  , cursor = ansi(process.stdout)

var request = require('request');
var cheerio = require('cheerio');

// let news = [];


request('https://www.vesti.ru/news', function (error, response, html) {
  cursor.hex('#b88fff').bold()
  console.log('НОВОСТИ');
  cursor.reset()
    if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        $('.list__title>a').each(function(i, element){
            console.log($(this).text());
            // news.push($(this).text())
        });
    } else {
        console.log(error, response.statusCode);
    }
});



const IAM_TOKEN = 't1.9euelZrJm8uJi8vJkp3LzpOOxomUie3rnpWakpKOm5eblY_Nkp6Yz86dzJLl9PdDUR9_-e83ERCo3fT3AwAdf_nvNxEQqA.5egIM0BDJSZvq1egqDv8MV8vXa7MXR52fT79hp7QOn9aRX-_aC4r-_zXJimRD9H1BVAoMspDI4NyrrRqOtvdBQ';
const FOLDER = 'b1gfbiqbma232hfugp7g'

const axios = require('axios');



// =================================
const express = require('express');
const app = express();

app.use(express.static(__dirname+'/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/translate', (req, res) => {

    let data = req.body;

    // var translate = axiosFunction (req.body.text, req.body.language)
    axios.post('https://translate.api.cloud.yandex.net/translate/v2/translate/', {
                "folder_id": FOLDER,
                "texts": req.body.text,
                "targetLanguageCode": req.body.language
            }, {
                headers: {
                    'Content-Type': 'aaplication/json',
                    'Authorization': 'Bearer ' + IAM_TOKEN
                }
            })
            .then((result) => {
              cursor.hex('#b88fff').bold()
              console.log('Результат перевода');
              cursor.reset()
                console.log(result.data);
                res.send(result.data.translations[0].text)
            }).catch((err) => {
                console.log(err);
            })


});

// app.get('/about', (req, res) => res.send('Nothing new about us...'));

const goodsRouter = express.Router();

goodsRouter.get('/:id', (req, res) => {
// app.get('/api/v1/goods/:id/', (req, res) => {
    fs.readFile('./public/catalogData.json', (err, data) => {
        if (!err) {
            let good;
            try {
                const goods = JSON.parse(data);
                console.log(req.params.id, goods);
                good = goods.find((good) => good.id_product == req.params.id)
                console.log(good);
            } catch (e) {
                res.status(500).json({ error: 'error parsing datafile'});
            }

            if (good) {
                res.json(good);
            } else {
                res.status(404).json('no such good with id '+req.params.id)
            }
        } else {
            res.status(500).json({ error: 'no data file!'});
        }
    })
});

goodsRouter.post('/', (req, res) => {
    console.log(req.body);
    const newGood = req.body;
    fs.readFile('./public/catalogData.json', (err, data) => {
        const goods = JSON.parse(data);

        if (goods.find((good) => good.id_product == newGood.id_product)) {
            res.status("400").json({ error: "already have good with id "+newGood.id_product });
        } else {
            goods.push(newGood);
            fs.writeFileSync('./public/catalogData.json', JSON.stringify(goods, null, '\t'));
            res.json({ result: "added good ok", id: newGood.id_product });
        }
    });
})

app.use('/api/v1/goods', goodsRouter);

app.listen(3000, () => console.log('Listening on port 3000'));

// =================================
