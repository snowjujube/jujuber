let async_readdir = require('./functions/async_readdir');
let async_writefile = require('./functions/async_writefile');
let async_append_file = require('./functions/async_append_file');
let async_read_file = require('./functions/async_readfile');

const makeRouteTree = async () => {
  let classesToImport = '';
  let primaryRoute = await async_readdir(__dirname + '/../src/route/');
  let tree = primaryRoute.map(item => ({name: item, children: []}));
  let index = 0;
  for (let route of primaryRoute) {
    let secondGradeRoute = await async_readdir(__dirname + '/../src/route/' + route + '/');
    for (let finalRoute of secondGradeRoute) {
      tree[index].children.push({name: finalRoute});
      let classToImport = 'import ' + finalRoute.slice(0, finalRoute.length - 3) + ' from ' + '"' + __dirname + '/../src/route/' + route + '/' + finalRoute + '"';
      classesToImport += classToImport + ';\n';
    }
    index++
  }
  await async_writefile('../src/appRouter.js', classesToImport);
  return tree;
};

const makeAppRouter = async (tree) => {
  let routeArray = [];
  for (let primaryRoute of tree) {
    let prname = primaryRoute.name;
    for (let secondGradeRoute of primaryRoute.children) {
      let sgrname = secondGradeRoute.name.slice(0, secondGradeRoute.name.length - 3);
      let path = '/' + prname + '/' + sgrname.slice(7).toLowerCase();
      let component = sgrname;
      let route = "<Route path='" + path + "' exact component={" + component + "} />"
      routeArray.push(route)
    }
  }
  let appendstr = "import {HashRouter as Router, Route, Switch} from 'react-router-dom';\n" +
    "import React, {Component} from 'react';\n" +
    "\n" +
    "export  default class AppRouter extends Component {\n" +
    "  render() {\n" +
    "    return (\n" +
    "      <Switch>\n" +
    "       " +
    routeArray.join('\n')
    +"" +
    "\n" +
    "        <Route path='/' exact render={()=>{\n" +
    "          return (\n" +
    "            <Home>\n" +
    "              {json.map(item => (<ArticleEntry title={item.title} category={item.category} time={item.time}\n" +
    "                                               path={item.path} content={item.content}/>))}\n" +
    "            </Home>\n" +
    "          )\n" +
    "        }}></Route>" +
    ""+


    + " \n" +
    "      </Switch>\n" +
    "    )\n" +
    "  }\n" +
    "}";

  let json = await async_read_file('../src/homeConfig.json');


  let homeRouteStr = "\n" +
    "" +
    "let json = " + json + "; \n" +
    "\n" +
    "import Home from './component/Home/Home';\n" +
    "import ArticleEntry from './component/ArticleEntry/ArticleEntry'; \n" +
    "\n"

  await async_append_file('../src/appRouter.js', homeRouteStr + appendstr)

}

makeRouteTree().then(async (tree) => {
  await makeAppRouter(tree);
  let title = ""
});


/*
*
* import { HashRouter as Router, Route } from 'react-router-dom';
*
* */