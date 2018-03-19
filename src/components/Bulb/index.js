import React, { Component } from 'react';
import './index.css';

class Bulb extends Component {
  dimensions = {
    "width": 64,
    "height": 96
  };

  render() {
    return (
      <img
        {...this.dimensions}
        className="cxsp-bulb"
        src="/images/bulb.png"
        srcSet="/images/bulb.png 1x, /images/bulb@2x.png 2x"
        alt="lightbulb icon"
      />
    );
  }
}

export default Bulb;
