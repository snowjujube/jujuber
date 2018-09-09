import JUJUBERWEBSOCKET from "/Users/snowjujube/netease/study/jujuber/bin/../src/route/Node.js/JUJUBERWEBSOCKET.js";
import JUJUBERWEBSOCKET2 from "/Users/snowjujube/netease/study/jujuber/bin/../src/route/Node.js/JUJUBERWEBSOCKET2.js";
import JUJUBERWEBSOCKET1 from "/Users/snowjujube/netease/study/jujuber/bin/../src/route/Nodeaa.js/JUJUBERWEBSOCKET1.js";
import JUJUBERTEST from "/Users/snowjujube/netease/study/jujuber/bin/../src/route/测试/JUJUBERTEST.js";

let json = [{"title":"测试","category":"测试","time":"Sun, 09 Sep 2018 04:53:39 GMT","timestamp":1536468819000,"className":"JUJUBERTEST","content":"\n\n\n# 标题\n\n\n```javascript\n\n\nlet a = 1;\nlet b = 2;\nconsole.log(123);\n\n```\n\n\n\n1| 1\n---|---\n2| 2","path":"/测试/test/"},{"title":"WebSocket的学习","category":"Node.js","time":"Sat, 08 Sep 2018 13:07:45 GMT","timestamp":1536412065000,"className":"JUJUBERWEBSOCKET","content":"\n\n# 序\n\n这几天在学习`Node.js`的时候，在学习到引入`net`库并建立`TCP`服务器的时候，我因为自己的知识储备不足犯下了利用浏览器访问`TCP`服务器的愚蠢的错误。在后来学习到构建`HTTP`服务器的时候，也了解到了`HTTP`协议的原理。\n\n简要的说`TCP`通过著名的三次握手和四次挥手，通过Socket，完成客户端和服务器的交互；`HTTP`则是无状态的，通过`Request`","path":"/Node.js/websocket/"},{"title":"WebSocket的学习","category":"Nodeaa.js","time":"Sat, 08 Sep 2018 13:07:45 GMT","timestamp":1536412065000,"className":"JUJUBERWEBSOCKET1","content":"\n\n# 序\n\n这几天在学习`Node.js`的时候，在学习到引入`net`库并建立`TCP`服务器的时候，我因为自己的知识储备不足犯下了利用浏览器访问`TCP`服务器的愚蠢的错误。在后来学习到构建`HTTP`服务器的时候，也了解到了`HTTP`协议的原理。\n\n简要的说`TCP`通过著名的三次握手和四次挥手，通过Socket，完成客户端和服务器的交互；`HTTP`则是无状态的，通过`Request`","path":"/Nodeaa.js/websocket1/"},{"title":"WebSocket的学习","category":"Node.js","time":"Sat, 08 Sep 2018 13:07:45 GMT","timestamp":1536412065000,"className":"JUJUBERWEBSOCKET2","content":"\n\n# 序\n\n这几天在学习`Node.js`的时候，在学习到引入`net`库并建立`TCP`服务器的时候，我因为自己的知识储备不足犯下了利用浏览器访问`TCP`服务器的愚蠢的错误。在后来学习到构建`HTTP`服务器的时候，也了解到了`HTTP`协议的原理。\n\n简要的说`TCP`通过著名的三次握手和四次挥手，通过Socket，完成客户端和服务器的交互；`HTTP`则是无状态的，通过`Request`","path":"/Node.js/websocket2/"}];

import Home from './component/Home/Home';
import ArticleEntry from './component/ArticleEntry/ArticleEntry';
import CategoryContent from './component/CategoryContent/CategoryContent';
import AboutMe from './component/AboutMe/AboutMe'



import Category from './component/Category/Category';
import CategoryItem from './component/CategoryItem/CategoryItem';
let categories = ['Node.js','Nodeaa.js','测试']
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import React, {Component} from 'react';

export  default class AppRouter extends Component {
  render() {
    return (
      <Switch>
       <Route path='/Node.js/websocket' exact component={JUJUBERWEBSOCKET} />
<Route path='/Node.js/websocket2' exact component={JUJUBERWEBSOCKET2} />
<Route path='/Nodeaa.js/websocket1' exact component={JUJUBERWEBSOCKET1} />
<Route path='/测试/test' exact component={JUJUBERTEST} />
        <Route path='/' exact render={()=>{
          return (
            <Home>
              {json.map(item => (<ArticleEntry title={item.title} category={item.category} time={item.time}
                                               path={item.path} content={item.content}/>))}
            </Home>
          )
        }}></Route>

        {
          categories.map(category => {
            let filteredArray = json.filter(item => item.category === category);
            return (
              <Route exact path={'/category/' + category} render={() => {
                return (
                  <CategoryContent title={category} num={filteredArray.length}>
                    {filteredArray.map(item => (
                      <ArticleEntry title={item.title} category={item.category} time={item.time}
                                    path={item.path} content={item.content}/>))}
                  </CategoryContent>
                )
              }}></Route>
            )
          })
        }
<Route path='/category' render={()=>{
       return     (<Category num='1'>
              {categories.map(item => (<CategoryItem path={'/category/' + item} name={item}/>))}
            </Category>)
          }}></Route>
<Route path='/about' component={AboutMe}></Route>      </Switch>
    )
  }
}