import React, { Component } from 'react';
import * as API from '../API';
import UserAvatar from '../UserAvatar';
import './index.css';

class User extends Component {
  constructor( props ) {
    super( props );

    this.state = {
      "name": "",
      "email": "",
      "avatar_url": ""
    };

    API.User.getProfile().then( ( result ) => {
      this.setState( result );
    } );
  }

  getClasses() {
    if ( this.props.logoutLinkModifier ) {
      return `cxsp-user__logout-link cxsp-user__logout-link--${this.props.logoutLinkModifier}`;
    }

    return 'cxsp-user__logout-link';
  }

  render() {
    return (
      <div className="cxsp-user">
        <UserAvatar className="cxsp-user__avatar" src={ this.state.avatar_url } />
        <div className="cxsp-user__name">{ this.state.name }</div>
        <div className="cxsp-user__logout">
          <a className={ this.getClasses() } href="javascript:void(0);" onClick={ this.props.logOut }>Log Out</a>
        </div>
      </div>
    );
  }
}

export default User;
