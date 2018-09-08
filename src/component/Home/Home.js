import './Home.css';
import React, {Component} from 'react';

export default class Home extends Component {
  render() {
    return (
      <section className="home-posts">
        {this.props.children}
      </section>
    )
  }
}
