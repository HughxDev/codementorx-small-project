import React, { Component } from 'react';
import Logo from '../Logo';
import User from '../User';
import './index.css';

class Sidebar extends Component {
  render() {
    return (
      <aside className="cxsp-sidebar">
        <header className="cxsp-sidebar__header">
          <Logo />
          <h2 className="cxsp-heading cxsp-sidebar__heading">The Idea Pool</h2>
        </header>
        <User logoutLinkModifier="sidebar" />
      </aside>
    );
  }
}

export default Sidebar;
