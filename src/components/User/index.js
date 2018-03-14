import React, { Component } from 'react';
import Avatar from '../Avatar';
import './index.css';

class User extends Component {
  profile = {
    "name": "Joyce Lee"
  };

  render() {
    return (
      <React.Fragment>
        <Avatar />
        <div>{this.profile.name}</div>
        <div><a href="javascript:void()">Log Out</a></div>
      </React.Fragment>
    );
  }
}

export default User;
