import React, { Component } from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';
import './index.css';

class Dashboard extends Component {
  render() {
    return (
      <div className="cxsp-wrapper">
        <Sidebar />
        <main className="cxsp-main">
          <Header />
          <p>Got ideas?</p>
        </main>
      </div>
    );
  }
}

export default Dashboard;
