import './Category.css';
import React, {Component} from 'react';

export default class Category extends Component {
  render() {
    return (
      <div className="category">
        <div className="category-header">
          <h1>全部分类</h1>
        </div>
        <div className="category-body">
          <div className="category-meta">目前共计{this.props.num}个分类</div>
          <div className="category-nav">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}