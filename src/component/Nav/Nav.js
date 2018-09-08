import React, {Component} from 'react';
import NavItem from '../NavItem/NavItem'
import './Nav.css';

export default class Nav extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <nav className="nav-main">
          <ul id="menu" className="menu">
            { this.props.children }
          </ul>
        </nav>
    )
  }
}