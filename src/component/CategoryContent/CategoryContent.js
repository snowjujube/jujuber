import './CategoryContent.css';
import React, {Component} from 'react';

export default class CategoryContent extends Component {
  render() {
    return (
      <div className="category-content-block">
        <div className="category-content-header">
          <div className="category-content-title">{this.props.title}</div>
          <div className="category-content-meta">共：{this.props.num}篇文章</div>
        </div>
        <div className="append-info">
          {this.props.children}
        </div>
      </div>
    )
  }
}