import React, { Component } from 'react';
import Sidebar from '../Sidebar';
import Dashboard from '../Dashboard';
import './index.css';

class App extends Component {
  render() {
    return (
      <div className="cxsp-wrapper">
        <Sidebar />
        <Dashboard />
      </div>
    );
  }
}

export default App;
