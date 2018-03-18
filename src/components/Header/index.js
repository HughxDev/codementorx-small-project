import React, { Component } from 'react';
import './index.css';

class Header extends Component {
  render() {
    return (
      <header className="cxsp-header">
        <h2 className="cxsp-heading cxsp-header__heading">My Ideas</h2>
        <button className="cxsp-button cxsp-header__add-idea" onClick={ this.props.beginIdea }>
          <img src="/images/add.png" srcSet="/images/add.png 1x, /images/add@2x.png 2x" alt="+" />
        </button>
      </header>
    );
  }
}

export default Header;
