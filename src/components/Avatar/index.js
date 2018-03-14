import React, { Component } from 'react';
import './index.css';

class Avatar extends Component {
  size = 64;
  dimensions = {
    "width": this.size,
    "height": this.size
  };

  render() {
    return (
      <img {...this.dimensions} src="/images/avatar.png" srcSet="/images/avatar.png 1x, /images/avatar@2x.png 2x" alt="your avatar" />
    );
  }
}

export default Avatar;
