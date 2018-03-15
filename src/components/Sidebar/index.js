import React, { Component } from 'react';
import Logo from '../Logo';
import User from '../User';
import './index.css';

class Sidebar extends Component {
  getHeaderClassNames() {
    var element = 'cxsp-sidebar__header';
    var modifiers = '';

    if ( this.props.isLoggedIn() ) {
      modifiers = ` ${element}--logged-in`;
    }

    return `${element}${modifiers}`;
  }

  render() {
    return (
      <aside className="cxsp-sidebar">
        <header className={ this.getHeaderClassNames() }>
          <Logo />
          <h1 className="cxsp-heading cxsp-sidebar__heading">The Idea Pool</h1>
        </header>
        { this.props.isLoggedIn() && <User logoutLinkModifier="sidebar" /> }
      </aside>
    );
  }
}

export default Sidebar;
