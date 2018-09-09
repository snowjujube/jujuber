import React, {Component} from 'react';
import Article from '../../component/Article/Article';
let html = (<div><h1>标题</h1>
<pre><code class="language-javascript">{`

let a = 1;
let b = 2;
console.log(123);

`}</code></pre>
<table>
<thead>
<tr>
<th>1</th>
<th>1</th>
</tr>
</thead>
<tbody>
<tr>
<td>2</td>
<td>2</td>
</tr>
</tbody>
</table>
</div>);
export default class JUJUBERTEST extends Component{
  render() {
    return (
      <Article title='测试' time='Sun, 09 Sep 2018 04:53:39 GMT' category='测试' content={html}/>
    )
  }
}