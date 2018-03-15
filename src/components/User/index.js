import React, { Component } from 'react';
import UserAvatar from '../UserAvatar';
import './index.css';

class User extends Component {
  profile = {
    "name": "Joyce Lee"
  };

  getClasses() {
    if ( this.props.logoutLinkModifier ) {
      return `cxsp-user__logout-link cxsp-user__logout-link--${this.props.logoutLinkModifier}`;
    }

    return 'cxsp-user__logout-link';
  }

  render() {
    return (
      <div className="cxsp-user">
        <UserAvatar className="cxsp-user__avatar" />
        <div className="cxsp-user__name">{this.profile.name}</div>
        <div className="cxsp-user__logout">
          <a className={this.getClasses()} href="javascript:void()">Log Out</a>
        </div>
      </div>
    );
  }
}

export default User;
