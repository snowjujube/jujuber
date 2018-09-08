console.log('开始生成React组件');
let fs = require('fs');
let markdown_path = __dirname + '/../src/post/';
let markdowns = fs.readdirSync(markdown_path);
let MarkdownIt = require('markdown-it');
let convertMD = new MarkdownIt();
let cheerio = require('cheerio');
let async_readdir = require('./functions/async_readdir');
let async_mkdir = require('./functions/async_mkdir');
let async_writefile = require('./functions/async_writefile');
let async_readfile = require('./functions/async_readfile');

async function loadArticleInfo() {

  let markdown_detail_array = [];

  const manageMarkdown = (path, markdown) => {
    return new Promise((resolve, reject) => {
      fs.readFile(path + markdown, 'utf-8', (error, detail) => {
        if (error) {
          reject(error)
        }
        else {
          resolve({detail, markdown})
        }
      })
    })
  };

  for (let md of markdowns) {
    let {detail, markdown} = await manageMarkdown(markdown_path, md);
    let className = "JUJUBER" + markdown.toUpperCase().split('').slice(0, markdown.length - 3).join('');
    let lines = detail.split('\n');
    let content = lines.slice(5).join('\n');
    let json = JSON.parse(lines[2]);
    let {time} = json;
    json.timestamp = new Date(time).getTime();
    json = Object.assign(json, {className, content});
    if (!json.category) json.category = 'default';
    markdown_detail_array.push(json);
  }

  let sorted_details = markdown_detail_array.sort((article1, article2) => {
    if (article1.timestamp < article2.timestamp) {
      return -1;
    }
    else if (article1.timestamp > article2.timestamp) {
      return 1;
    }
    else return 0;
  });
  let json_output = sorted_details.map((article) => ({
    ...article,
    path: '/' + article.category + '/' + article.className.slice(7).toLowerCase() + '/',
    content: article.content.slice(0,200)
  }));
  await async_writefile(__dirname + '/../src/homeConfig.json', JSON.stringify(json_output));


  return markdown_detail_array
}

loadArticleInfo().then((data) => {
  /*
    data :
           [
              { title: '', category: '', content: '' , className: ''},
              { title: '', category: '', content: '' , className: ''},
              { title: '', category: '', content: '' , className: ''},
                ...
           ]
   */

  data.forEach(createNewRoute);
});

const createNewRoute = async (article) => {

  // let interval = setInterval(function () {
  //   process.stdout.write('.')
  // }, 1);
  /*article: { title: '', category: '', content: '' }*/
  let {title, category, content, className, time} = article;
  console.log("正在生成：" + title);
  if (!category) {
    category = 'default';
  }
  let routePath = __dirname + '/../src/route/' + category + '/';
  let routeName = className + '.js';
  let moduleToImport =
    "import React, {Component} from 'react';\n" +
    "import Article from '../../component/Article/Article';";


  let md = convertMD.render(content);
  let $ = cheerio.load(md, {
    decodeEntities: false
  });

  $("code").each((index, elem) => {
    $(elem).text("{`" + $(elem).text() + "`}")
  });


  let script = "\n" +
    "let html = (<div>" + $('body').html() + "</div>);\n" +
    "export default class " + className + " extends Component{\n" +
    "  render() {\n" +
    "    return (\n" +
    "      <Article title='" + title + "' time='" + time + "' category='" + category + "' content={html}/>\n" +
    "    )\n" +
    "  }\n" +
    "}" +
    "";


  await async_readdir(routePath);
  await async_mkdir(routePath);
  await async_writefile(routePath + routeName, moduleToImport + script);
  // clearInterval(interval);
  // console.log('');
};