import React, { Component } from 'react';
import './index.css';

class Logo extends Component {
  render() {
    return (
      <img
        src="/images/logo.png"
        srcSet="/images/logo.png 1x, /images/logo@2x.png 2x"
        alt="lightbulb logo"
      />
    );
  }
}

export default Logo;
