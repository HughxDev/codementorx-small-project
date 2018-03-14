import React, { Component } from 'react';
import './index.css';

class Header extends Component {
  render() {
    return (
      <header className="cxsp-header">
        <h1 className="cxsp-header__heading">My Ideas</h1>
        <button className="cxsp-header__add-idea">
          <span className="cxsp-header__add-idea-plus">+</span>
        </button>
      </header>
    );
  }
}

export default Header;
