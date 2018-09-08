import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import './NavItem.css';

export default class NavItem extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <li className={['menu-item', 'menu-item-' + this.props.kind].join(' ')}>
        <NavLink exact activeClassName='menu-item-active' to={this.props.pathName}><i className="menu-item-icon"/>{this.props.itemName}</NavLink>
      </li>
    )
  }

}