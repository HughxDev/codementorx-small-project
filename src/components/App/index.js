import React, { Component } from 'react';
import Sidebar from '../Sidebar';
import SignUpLogIn from '../SignUpLogIn';
import Dashboard from '../Dashboard';
import Promise from 'promise-polyfill';
import 'whatwg-fetch';
import { User, Ideas } from '../API';
import './index.css';

class App extends Component {
  constructor( props ) {
    super( props );

    this.state = {
      "isLoggedIn": false
    };
  }

  _testApi() {
    User.login( {
      "email": "hugh@hughguiney.com",
      "password": "Password123"
    } )
    .then( ( result ) => {
      console.log( 'Logged in!' );
      return User.refreshToken();
    } )
    .then( ( result ) => {
      return User.profile().then( ( result ) => {
        console.log( 'Got profile!' );
        console.log( result );
      });
    } )
    .then( ( result ) => {
      Ideas.create( {
        "content": "the-content",
        "impact": 8,
        "ease": 8,
        "confidence": 8
      } ).then( ( result ) => {
        console.log( 'Idea created!' );
        Ideas.get().then( ( result ) => {
          console.log( result );

          Ideas.destroy( result.pop().id ).then( ( result ) => {
            console.log( 'Idea deleted!' );
            console.log( result );

            Ideas.get().then( ( result ) => {
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
    //   return User.logout().then( ( result ) => {
    //     console.log( 'Logged out!' );
    //   } );
    // } );
  }

  isLoggedIn = () => {
    return this.state.isLoggedIn;
  };

  signUp = ( formData ) => {
    console.log( 'Attempting to sign up' );
  };

  logIn = ( formData ) => {
    console.log( 'Attempting to log in' );

    User.logIn( formData ).then( ( result ) => {
      // console.log( result );
      this.setState( { "isLoggedIn": true } );
    } )
    .catch( ( error ) => {
      console.log( error );
      this.setState( { "isLoggedIn": false } );
    } );
  };

  componentDidMount() {
    // this._testApi();

    // var me = new User( {
    //   "email": "hugh@hughguiney.com",
    //   "password": "Password123"
    // } );

    // me.profile().then( ( result ) => {
    //   console.log( result );
    //   return result;
    // } );
  }

  render() {
    return (
      <div className="cxsp-wrapper">
        <Sidebar isLoggedIn={ this.isLoggedIn } />
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
