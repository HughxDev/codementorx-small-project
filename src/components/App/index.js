import React, { Component } from 'react';
import Sidebar from '../Sidebar';
import SignUpLogIn from '../SignUpLogIn';
import Dashboard from '../Dashboard';
import Promise from 'promise-polyfill';
import 'whatwg-fetch';
import * as API from '../API';
import './index.css';

class App extends Component {
  // constructor( props ) {
  //   super( props );
  //
  //   this.state = {
  //     "isLoggedIn": API.User.isLoggedIn()
  //   };
  // }

  _testApi() {
    API.User.logIn( {
      "email": "hugh@hughguiney.com",
      "password": "Password123"
    } )
    .then( ( result ) => {
      console.log( 'Logged in!' );
      return API.User.refreshToken();
    } )
    .then( ( result ) => {
      return API.User.profile().then( ( result ) => {
        console.log( 'Got profile!' );
        console.log( result );
      });
    } )
    .then( ( result ) => {
      API.Ideas.create( {
        "content": "the-content",
        "impact": 8,
        "ease": 8,
        "confidence": 8
      } ).then( ( result ) => {
        console.log( 'Idea created!' );
        API.Ideas.get().then( ( result ) => {
          console.log( result );

          API.Ideas.destroy( result.pop().id ).then( ( result ) => {
            console.log( 'Idea deleted!' );
            console.log( result );

            API.Ideas.get().then( ( result ) => {
              console.log( result );
            } );
          } )
          .catch( ( error ) => {
            console.log( error );
          } );
        } )
      } )
    } )
    // .then( ( result ) => {
    //   return API.User.Logout().then( ( result ) => {
    //     console.log( 'Logged out!' );
    //   } );
    // } );
  }

  isLoggedIn = () => {
    // return this.state.isLoggedIn;
    return API.User.isLoggedIn();
  };

  signUp = ( formData ) => {
    console.log( 'Attempting to sign up' );
  };

  logIn = ( formData ) => {
    console.log( 'Attempting to log in' );

    API.User.logIn( formData ).then( ( result ) => {
      console.log( 'Logged in' );
      // console.log( result );
      this.setState( { "isLoggedIn": API.User.isLoggedIn() } );
    } )
    .catch( ( error ) => {
      console.log( error );
      this.setState( { "isLoggedIn": API.User.isLoggedIn() } );
    } );
  };

  logOut = () => {
    API.User.logOut().then( ( result ) => {
      this.setState( { "isLoggedIn": API.User.isLoggedIn() } );
    } );
  };

  constructor() {
    super();

    this.state = {
      "isLoggedIn": API.User.isLoggedIn(),
    };
  }

  render() {
    return (
      <div className="cxsp-wrapper">
        <Sidebar isLoggedIn={ this.isLoggedIn } logOut={ this.logOut } />
        <div className="cxsp-workspace">
          <div className="cxsp-workspace__inner">
            { !this.isLoggedIn() && <SignUpLogIn signUp={ this.signUp } logIn={ this.logIn } /> }
            { this.isLoggedIn() && <Dashboard /> }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
