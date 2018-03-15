import React, { Component } from 'react';
import Sidebar from '../Sidebar';
import LogIn from '../LogIn';
import Dashboard from '../Dashboard';
import Promise from 'promise-polyfill';
import 'whatwg-fetch';
import { User, Ideas } from '../API';
import './index.css';

class App extends Component {
  isLoggedIn() {
    return true;
  }

  componentDidMount() {
    // User.create( {
    //   "email": "hugh@hughguiney.com",
    //   "name": "Hugh Guiney",
    //   "password": "Password123"
    // } ).then( ( result ) => {
    //   console.log( result );
    // } );

    User.login( {
      "email": "hugh@hughguiney.com",
      "password": "Password123"
    } )
    .then( ( result ) => {
      return User.refreshToken();
    } )
    .then( ( result ) => {
      return User.profile().then( ( result ) => { console.log( result ); });
    } )
    .then( ( result ) => {
      Ideas.create( {
        "content": "the-content",
        "impact": 8,
        "ease": 8,
        "confidence": 8
      } ).then( ( result ) => {
        Ideas.get().then( ( result ) => {
          console.log( result );

          Ideas.destroy( result.pop().id ).then( ( result ) => {
            console.log( result );

            Ideas.get().then( ( result ) => {
              console.log( result );
            } );
          } );
        } )
      } )
    } )
    // .then( ( result ) => {
    //   return User.logout();
    // } );
  }

  render() {
    return (
      <div className="cxsp-wrapper">
        <Sidebar isLoggedIn={ this.isLoggedIn } />
        <div className="cxsp-workspace">
          <div className="cxsp-workspace__inner">
            { !this.isLoggedIn() && <LogIn /> }
            { this.isLoggedIn() && <Dashboard /> }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
