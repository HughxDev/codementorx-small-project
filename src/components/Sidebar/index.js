import React, { Component } from 'react';
import Logo from '../Logo';
import User from '../User';
import './index.css';

class Sidebar extends Component {
  render() {
    return (
      <aside className="cxsp-sidebar">
        <header>
          <Logo />
          <h2>The Idea Pool</h2>
        </header>
        <User />
      </aside>
    );
  }
}

export default Sidebar;
