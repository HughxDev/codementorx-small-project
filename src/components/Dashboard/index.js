import React, { Component } from 'react';
import Header from '../Header';
import Ideas from '../Ideas';
import './index.css';

class Dashboard extends Component {
  render() {
    return (
      <div className="cxsp-dashboard">
        <div className="cxsp-dashboard__inner">
          <Header />
          <Ideas />
        </div>
      </div>
    );
  }
}

export default Dashboard;
