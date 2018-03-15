import React, { Component } from 'react';
import Sidebar from '../Sidebar';
import LogIn from '../LogIn';
import Dashboard from '../Dashboard';
import './index.css';

class App extends Component {
  isLoggedIn() {
    return true;
  }

  render() {
    return (
      <div className="cxsp-wrapper">
        <Sidebar isLoggedIn={ this.isLoggedIn } />
        <div className="cxsp-workspace">
          <div className="cxsp-workspace__inner">
            { !this.isLoggedIn() && <LogIn /> }
            { this.isLoggedIn() && <Dashboard /> }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
