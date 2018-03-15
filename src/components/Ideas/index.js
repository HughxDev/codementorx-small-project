import React, { Component } from 'react';
import Bulb from '../Bulb';
import NoIdeas from '../NoIdeas';
import './index.css';

class Ideas extends Component {
  render() {
    return (
      <main className="cxsp-ideas">
        <NoIdeas />
      </main>
    );
  }
}

export default Ideas;
