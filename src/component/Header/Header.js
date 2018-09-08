import React, {Component} from 'react';
import './Header.css';

export default class Header extends Component {

  constructor(props) {
    super(props)
    this.state = {
      toggleStatus: false
    }
  }


  handleToggleButtonClick() {
    this.setState({
      toggleStatus: !this.state.toggleStatus
    })
  }


  render() {
    return (
      <div className="header-inner">
        <div className="site-meta">
          <div className="site-title">{this.props.siteName}</div>
          <div className="site-description">{this.props.siteDescription}</div>
          <div onClick={this.handleToggleButtonClick.bind(this)} className="toggle-btn">{/*toggle按钮*/}</div>
        </div>
        <div className={this.state.toggleStatus ? "append-part" : "append-part append-part-hidden"}>
          {this.props.children}
        </div>
      </div>
    )
  }
}