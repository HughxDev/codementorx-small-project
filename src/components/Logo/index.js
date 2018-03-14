import React, { Component } from 'react';
import './index.css';

class Logo extends Component {
  render() {
    return <img src="/images/icon.png" srcSet="/images/icon.png 1x, /images/icon@2x.png 2x" alt="lightbulb logo" />;
  }
}

export default Logo;
