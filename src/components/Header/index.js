import React, { Component } from 'react';
import './index.css';

class Header extends Component {
  handleAddIdea = ( event ) => {
    var newIdea = {
      "content": "",
      "impact": 10,
      "ease": 10,
      "confidence": 10
    };

    this.props.addIdea( newIdea );
  };

  render() {
    return (
      <header className="cxsp-header">
        <h2 className="cxsp-heading cxsp-header__heading">My Ideas</h2>
        <button className="cxsp-button cxsp-header__add-idea" onClick={ this.handleAddIdea }>
          <img src="/images/add.png" srcSet="/images/add.png 1x, /images/add@2x.png 2x" alt="+" />
        </button>
      </header>
    );
  }
}

export default Header;
