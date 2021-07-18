const getMoviesData = require('./getMovie.js');
const fs = require('fs');

getMoviesData().then(movies => {
    let moviesJson = JSON.stringify(movies);
    fs.writeFile('movies.json',moviesJson,() => {
        console.log('爬取成功已存入文件！！！');
    })
})