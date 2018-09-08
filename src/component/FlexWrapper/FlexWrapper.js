import './FlexWrapper.css';
import React, {Component} from 'react';


export default class FlexWrapper extends Component {
  render() {
    return (
      <div className="flex-wrapper">
        {this.props.children}
      </div>
    )
  }
}