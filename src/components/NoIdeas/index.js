import React, { Component } from 'react';
import Bulb from '../Bulb';
import './index.css';

class NoIdeas extends Component {
  render() {
    return (
      <div className="cxsp-ideas__no-ideas" hidden={ this.props.hidden }>
        <Bulb />
        <p className="cxsp-no-ideas__p">Got ideas?</p>
      </div>
    );
  }
}

export default NoIdeas;
