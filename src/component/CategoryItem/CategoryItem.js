import './CategoryItem.css';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class CategoryItem extends Component {
  render() {
    return (
      <div className="category-item">
        <Link to={this.props.path}>{this.props.name}</Link>
      </div>
    )
  }
}