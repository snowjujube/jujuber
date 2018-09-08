import React, {Component} from 'react';
import './Article.css';
import './postBody.less'
import highlight from 'highlight.js/'

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      content: eval(this.props.content),
      time: this.props.time,
      category: this.props.category
    };
  }

  onComponentMounted() {
    highlight.initHighlightingOnLoad();
  }

  render() {
    return (
      <article className="post">
        <div className="post-block">
          <div className="post-header">
            <h1 className="post-title">{this.state.title}</h1>
            <div className="post-meta">
              <div className="post-time">
                发表于： {this.state.time}
              </div>
              <div className="post-category">
                分类： {this.state.category}
              </div>
            </div>
          </div>
          <div className="post-body markdown-body">
            {this.state.content}
          </div>
        </div>
      </article>
    )
  }
}

export default Article;