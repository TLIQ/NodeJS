const axios = require("axios");
const cheerio = require("cheerio");

const news = {
    rassledovaniya : 'Расследования',
    stati : 'Статьи',
    mneniya : 'Мнения',
    wow : 'Wow'
}

exports.news = news;
exports.getNews = getNews;
async function getNews (category) {
    let result = await axios
    .get(`https://life.ru/s/` + category.category)
    .then(function (response) {
      let html = response.data;
      let $ = cheerio.load(html, null, false);
      let newsArray = [];

      
      $(".Text_root__39983.styles_title__VjSwt.Text_size-medium__2fa21.Text_color-black__21BSO.Text_fontWeight-bold__1bb1T.Text_fontType-roboto__2CbPa").each(function (i, element) {
        newsArray.push($(this).text())
      });
      let result = { news: newsArray, category: news[category.category]};
      
      return result;
    })
    .catch(function (error) {
      console.log(error.message);
      return null;
    });

  return result;
}
