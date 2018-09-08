import './ArticleEntry.css'
import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class ArticleEntry extends Component {
  render() {
    return (
      <article className="home-post">
        <div className="home-post-block">
          <div className="home-post-header">
            <h1 className="home-post-title"><Link to={this.props.path}>{this.props.title}</Link></h1>
            <div className="home-post-meta">
              <div className="home-post-time">
                发表于： {this.props.time}
              </div>
              <div className="home-post-category">
                分类： {this.props.category}
              </div>
            </div>
          </div>
          <div className="home-post-body markdown-body">
            {this.props.content}
          </div>
          <div className="home-post-btn">
            <Link to={this.props.path}>阅读全文</Link>
          </div>
        </div>
      </article>
    )
  }
}