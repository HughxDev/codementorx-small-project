import React, { Component } from 'react';
import './index.css';

class UserAvatar extends Component {
  size = 64;
  dimensions = {
    "width": this.size,
    "height": this.size
  };

  getSrcSet() {
    const gravatarSizeParameterRegex = /([&?])s=[0-9]+/;

    return `${this.props.src.replace( gravatarSizeParameterRegex, '$1s=' + this.size )} 1x, ${this.props.src.replace( gravatarSizeParameterRegex, '$1s=' + ( this.size * 2 ) )} 2x`;
  }

  render() {
    return (
      <img
        { ...this.dimensions }
        className={ this.props.className }
        src={ this.props.src }
        srcSet={ this.getSrcSet() }
        alt="your avatar"
      />
    );
  }
}

export default UserAvatar;
