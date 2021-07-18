const axios = require('axios');
const cheerio = require('cheerio');

// 得到一个包含所有信息的 html 字符串
async function getMoviesHtml () {
    const resp = await axios.get("https://movie.douban.com/chart");
    return resp.data;
}

// 获取电影数据
async function getMoviesData () {
    const data = await getMoviesHtml();
    // 将 html 字符串转换为一个对象
    const $ = cheerio.load(data);
    let trs = $('tr.item');
    const movies = [];
    for(let i = 0;i < trs.length;i ++) {
        // 分析相关数据得到一部电影的信息
        const movieData = getMoviesMessage($(trs[i]));
        movies.push(movieData);
    }
    return movies;
}

function getMoviesMessage (tr) {
    let name =  tr.find("div.pl2 a").text();
    name = name.replace(/\s/g, "");
    name = name.split("/")[0];
    let imgSrc =  tr.find('td a.nbg img').attr('src');
    let details =  tr.find("div.pl2 p.pl").text();
    return {
        name,
        imgSrc,
        details
    }
}

module.exports = getMoviesData;
