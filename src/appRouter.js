import JUJUBERWEBSOCKET from "/Users/snowjujube/netease/study/jujuber/bin/../src/route/Node.js/JUJUBERWEBSOCKET.js";
import JUJUBERWEBSOCKET1 from "/Users/snowjujube/netease/study/jujuber/bin/../src/route/Node.js/JUJUBERWEBSOCKET1.js";
import JUJUBERWEBSOCKET2 from "/Users/snowjujube/netease/study/jujuber/bin/../src/route/Node.js/JUJUBERWEBSOCKET2.js";

let json = [{"title":"WebSocket的学习","category":"Node.js","time":"Sat, 08 Sep 2018 13:07:45 GMT","timestamp":1536412065000,"className":"JUJUBERWEBSOCKET","content":"\n\n# 序\n\n这几天在学习`Node.js`的时候，在学习到引入`net`库并建立`TCP`服务器的时候，我因为自己的知识储备不足犯下了利用浏览器访问`TCP`服务器的愚蠢的错误。在后来学习到构建`HTTP`服务器的时候，也了解到了`HTTP`协议的原理。\n\n简要的说`TCP`通过著名的三次握手和四次挥手，通过Socket，完成客户端和服务器的交互；`HTTP`则是无状态的，通过`Request`","path":"/Node.js/websocket/"},{"title":"WebSocket的学习","category":"Node.js","time":"Sat, 08 Sep 2018 13:07:45 GMT","timestamp":1536412065000,"className":"JUJUBERWEBSOCKET1","content":"\n\n# 序\n\n这几天在学习`Node.js`的时候，在学习到引入`net`库并建立`TCP`服务器的时候，我因为自己的知识储备不足犯下了利用浏览器访问`TCP`服务器的愚蠢的错误。在后来学习到构建`HTTP`服务器的时候，也了解到了`HTTP`协议的原理。\n\n简要的说`TCP`通过著名的三次握手和四次挥手，通过Socket，完成客户端和服务器的交互；`HTTP`则是无状态的，通过`Request`","path":"/Node.js/websocket1/"},{"title":"WebSocket的学习","category":"Node.js","time":"Sat, 08 Sep 2018 13:07:45 GMT","timestamp":1536412065000,"className":"JUJUBERWEBSOCKET2","content":"\n\n# 序\n\n这几天在学习`Node.js`的时候，在学习到引入`net`库并建立`TCP`服务器的时候，我因为自己的知识储备不足犯下了利用浏览器访问`TCP`服务器的愚蠢的错误。在后来学习到构建`HTTP`服务器的时候，也了解到了`HTTP`协议的原理。\n\n简要的说`TCP`通过著名的三次握手和四次挥手，通过Socket，完成客户端和服务器的交互；`HTTP`则是无状态的，通过`Request`","path":"/Node.js/websocket2/"}]; 

import Home from './component/Home/Home';
import ArticleEntry from './component/ArticleEntry/ArticleEntry'; 

import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import React, {Component} from 'react';

export  default class AppRouter extends Component {
  render() {
    return (
      <Switch>
       <Route path='/Node.js/websocket' exact component={JUJUBERWEBSOCKET} />
<Route path='/Node.js/websocket1' exact component={JUJUBERWEBSOCKET1} />
<Route path='/Node.js/websocket2' exact component={JUJUBERWEBSOCKET2} />
        <Route path='/' exact render={()=>{
          return (
            <Home>
              {json.map(item => (<ArticleEntry title={item.title} category={item.category} time={item.time}
                                               path={item.path} content={item.content}/>))}
            </Home>
          )
        }}></Route>0      </Switch>
    )
  }
}