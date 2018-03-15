import React, { Component } from 'react';
import './index.css';

class Header extends Component {
  render() {
    return (
      <header className="cxsp-header">
        <h1 className="cxsp-heading cxsp-header__heading">My Ideas</h1>
        <button className="cxsp-button cxsp-header__add-idea">
          <img src="/images/add.png" srcSet="/images/add.png 1x, /images/add@2x.png 2x" alt="+" />
        </button>
      </header>
    );
  }
}

export default Header;
