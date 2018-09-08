import React, {Component} from 'react';
import Article from '../../component/Article/Article';
let html = (<div><h1>序</h1>
<p>这几天在学习<code>{`Node.js`}</code>的时候，在学习到引入<code>{`net`}</code>库并建立<code>{`TCP`}</code>服务器的时候，我因为自己的知识储备不足犯下了利用浏览器访问<code>{`TCP`}</code>服务器的愚蠢的错误。在后来学习到构建<code>{`HTTP`}</code>服务器的时候，也了解到了<code>{`HTTP`}</code>协议的原理。</p>
<p>简要的说<code>{`TCP`}</code>通过著名的三次握手和四次挥手，通过Socket，完成客户端和服务器的交互；<code>{`HTTP`}</code>则是无状态的，通过<code>{`Request`}</code>和<code>{`Response`}</code>来在服务器和客户机间做交流。所谓的无状态，是指浏览器每次向服务器发起请求的时候，不是通过一个连接，而是每次都建立一个新的连接。如果是一个连接的话，服务器进程中就能保持住这个连接并且在内存中记住一些信息状态。而每次请求结束后，连接就关闭，相关的内容就释放了，所以记不住任何状态，成为无状态连接。</p>
<p>从层面上来讲，<code>{`TCP`}</code>在传输层，<code>{`HTTP`}</code>在应用层。</p>
<p><code>{`HTTP`}</code>就是在每次请求的时候建立一个<code>{`TCP`}</code>连接，但当请求结束，<code>{`TCP`}</code>连接就会直接关闭。这也就意味着，每当<code>{`HTTP`}</code>访问一次，就要建立一个新的<code>{`TCP`}</code>连接。</p>
<p>而我们直接通过<code>{`TCP`}</code>服务器编程的话，我们可以通过我们自己的代码来控制什么时候打开连接，什么时候关闭连接。而正因为<code>{`HTTP`}</code>不支持这一点，假若我们想在自己的网站中构建一个即时聊天应用，反复的<code>{`HTTP`}</code>请求不仅占用内存而且服务器没有办法主动向客户机发出消息，这种单方向请求的模型有一个巨大的弊端，服务器如果有连续的状态变化，客户机想要知晓就非常麻烦。大多数Web应用程序将通过繁琐的Javascript和XML（AJAX）请求实现长轮训。非常浪费资源。</p>
<h1>WebSocket是什么</h1>
<p><code>{`WebSocket`}</code>是一种网络通信协议。从<code>{`HTML5`}</code>开始提供的在单个<code>{`TCP`}</code>连接上进行全双工通讯的协议。</p>
<h1>为什么需要Websocket</h1>
<p>序中自己的语言描述的有点拖沓。</p>
<p>首先，<code>{`HTTP`}</code>协议是一种无状态的、无连接的、单向的应用层协议。它采用了请求/响应模型。通信请求只能由客户端发起，服务端对请求做出应答处理。</p>
<p>正因为<code>{`HTTP`}</code>半双工，注定了如果服务器有连续的状态变化，客户端要获知就非常麻烦。大多数 <code>{`Web`}</code> 应用程序将通过频繁的异步JavaScript和XML（AJAX）请求实现长轮询。轮询的效率低，非常浪费资源（因为必须不停连接，或者 <code>{`HTTP`}</code> 连接始终打开）。</p>
<p>因此，工程师们一直在思考，有没有更好的方法。<code>{`WebSocket`}</code> 就是这样发明的。<code>{`WebSocket`}</code> 连接允许客户端和服务器之间进行全双工通信，以便任一方都可以通过建立的连接将数据推送到另一端。<code>{`WebSocket`}</code> 只需要建立一次连接，就可以一直保持连接状态。这相比于轮询方式的不停建立连接显然效率要大大提高。</p>
<h1>WebSocket如何工作</h1>
<p>Web浏览器和服务器都必须实现<code>{`WebSocket`}</code>协议来建立和维护连接，由于<code>{`WebSocket`}</code>连接长时间存在，与典型的<code>{`HTTP`}</code>不同，对服务器有重要的影响。</p>
<p>基于多线程或者多进程的服务器无法适用于<code>{`WebSocket`}</code>，因为它旨在打开连接，尽可能快的处理请求然后关闭连接。任何实际的<code>{`WebSocket`}</code>服务器的实现都需要一个异步服务器。</p>
<h1>WebSocket客户端</h1>
<p>在客户端，没有必要为<code>{`WebSocket`}</code>使用JavaScript库，实现<code>{`WebSocket`}</code>的浏览器将通过<code>{`WebSocket`}</code>对象公开所有必须的客户端功能（支持HTML5的浏览器）。</p>
<h1>WebSocket服务端</h1>
<p>其实后端语言都有这样的功能。以我学习的<code>{`Node.js`}</code>为例，通过<code>{`npm`}</code>引入<code>{`ws`}</code>或者<code>{`socket.io`}</code>库，都是不错的选择。</p>
<h1>构建一个简单的聊天APP</h1>
<h2>客户端</h2>
<pre><code>{`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>A Simple Chat App</title>
    <link rel="stylesheet" href="./css/bootstrap.css">
    <style>
        body {
            color: #ffffff;
            background: linear-gradient(cornflowerblue, orange);
            background-repeat: no-repeat;
            background-size: 100% 1500px;
            height: 100%;
        }

        .received {
            border-radius: 10px;
            background-color: #f1b0b7;
            padding: 10px;
            word-break: break-all;
        }

        .sent {
            border-radius: 10px;
            background-color: #9fcdff;
            padding: 10px;
            word-break: break-all;
        }

        #msgbox {
            width: 100%;
            overflow: scroll;
            height: 750px;
            padding-top: 50px
        }

        #sendit {
            display: inline-block;
        }

        #editbox {
            position: fixed;
            bottom: 10px;
            left: 0px;
            width: 100%;
            text-align: center
        }

    </style>
</head>
<body>
<div class="container">
    <div id="app">
        <div id="msgbox" class="container-fluid">
            <div style="margin: 10px" v-for="msg in msgbox" v-html="msg"></div>
        </div>
        <div id="editbox" class="input-group-lg">
            <input v-model="smsg" style="width: 50%;display: inline-block" type="text" class="form-control">
            <button id="sendit" @click="send" class="btn-info btn-lg">Send It</button>
        </div>
    </div>
</div>
<script src="js/vue.js"></script>
<script>

  var ws = new WebSocket("ws://localhost:1508");

  var app = new Vue({
    el: "#app",
    mounted() {
      console.log(this.smsg)
    },
    methods: {
      send: function () {
        if (this.smsg === '') return console.log('Nothing Input')
        ws.send(this.smsg)
        let msg = this.createmsgbox(this.smsg, 'send')
        this.msgbox.push(msg)
        this.smsg = ''
        setTimeout(() => {
          document.getElementById('msgbox').scrollTop = document.getElementById('msgbox').scrollHeight
        })
        ws.onopen = (evt) => {
          console.log(this.smsg)
        }
        ws.onmessage = (data) => {
          console.log(data.data)
          let msg = this.createmsgbox(data.data)
          this.msgbox.push(msg)
          this.smsg = ''
          setTimeout(() => {
            document.getElementById('msgbox').scrollTop = document.getElementById('msgbox').scrollHeight
          })
        }
      },
      createmsgbox: function (msg, job) {
        if (job === 'send') {
          return "<div class='col-lg-3 offset-9 col-sm-3 sent'>" + msg + "</div>"
        }
        return "<div class='received col-lg-3 col-sm-3'>" + msg + "</div>"
      }
    },
    data() {
      return {
        smsg: "",
        rmsg: "",
        msgbox: ["<div class='col-lg-3 offset-9 col-sm-3 sent'>Say Something</div>", "<div class='received col-lg-3 col-sm-3'>Get Something</div>"]
      }
    }
  })
</script>
</body>
</html>
`}</code></pre>
<p>主要的时间花在了前端页面的构造上，但是其实重要的地方就是与后端服务器的交流部分（构建WebSocket），如下：</p>
<pre><code>{`var ws = new WebSocket("ws://localhost:1508");
ws.send(//)
ws.onopen = (evt) => {
				//
        }
        ws.onmessage = (data) => {
					//
          })
        }
`}</code></pre>
<h2>服务端</h2>
<pre><code>{`const ws = require('ws')

const WebSocketServer = ws.Server

const server = new WebSocketServer({port: 1508})

server.on('connection', (socket) => {
  console.log('connecting!')
  socket.on('message', (data) => {
    console.log(data)
    socket.send("😄 Get Your Data: "+data)
  })
})
`}</code></pre>
<p>写的比较简陋主要是做一个接受数据然后返回数据给客户端的工作，一个<code>{`WebSocket`}</code>是异步的所以可以同时和多个客户机交流，与每个客户端的连接在当前生成的<code>{`WebSocket`}</code>服务器的<code>{`connection`}</code>属性中保留。</p>
<p>也就是跟着这个思路，对客户端和服务端进行一些完善，我们就可以通过<code>{`WebSocket`}</code>服务器来构建一个双向的，客户端客户端之间的聊天App。</p>
</div>);
export default class JUJUBERWEBSOCKET extends Component{
  render() {
    return (
      <Article title='WebSocket的学习' time='Sat, 08 Sep 2018 13:07:45 GMT' category='Node.js' content={html}/>
    )
  }
}