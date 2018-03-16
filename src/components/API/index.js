import moment from 'moment';

/*
  Can’t do this in create-react-app unfortunately.
  Babel doesn’t allow extended built-in classes without a plugin.
  Can’t add custom Babel plugins without ejecting.
*/
// class HttpError extends Error {};
// class 'AuthError' extends Error {};

class API {
  static get baseEndpoint() {
    return "https://small-project-api.herokuapp.com";
  }

  static get defaultFetchOptions() {
    var options = {
      "method": "GET",
      "headers": {
        "Content-Type": "application/json"
      }
    };

    return options;
  }

  static checkStatus( response ) {
    if ( response.status >= 200 && response.status < 300 ) {
      return response;
    } else {
      var error = new Error( response.statusText );
      error.response = response;
      throw error;
    }
  }

  static parseJSON( response ) {
    if ( response.status === 204 ) {
      return response;
    }

    return response.json();
  }

  // Generic Storage

  static _store( key, object ) {
    return localStorage.setItem( `codementorx-small-project.${key}`, JSON.stringify( object ) );
  }

  static _retrieve( key ) {
    return JSON.parse( localStorage.getItem( `codementorx-small-project.${key}` ) );
  }

  static _clear( key ) {
    return localStorage.removeItem( `codementorx-small-project.${key}` );
  }

  // Identity Storage

  static getIdentity() {
    var identity = this._retrieve( 'identity' );

    if ( identity ) {
      identity.expires = moment( identity.expires );
    }

    return identity;
  }

  static setIdentity( identity ) {
    identity.expires = moment().add( 10, 'minutes' ).format();

    return this._store( 'identity', identity );
  }

  static clearIdentity() {
    return this._clear( 'identity' );
  }

  // Profile Storage

  static getProfile() {
    return this._retrieve( 'profile' );
  }

  static setProfile( profile ) {
    return this._store( 'profile', profile );
  }

  static clearProfile() {
    return this._clear( 'profile' );
  }
} // /API

class User extends API {
  // constructor() {
  //   super();
  // }

  static create( user ) {
    const endpoint = this.baseEndpoint + '/users';

    return (
      fetch(
        endpoint,
        {
          ...this.defaultFetchOptions,
          "method": "POST",
          "body": JSON.stringify( user )
        }
      )
      .then( this.checkStatus )
      .then( this.parseJSON )
      .then( ( result ) => {
        this.setIdentity( result );
        return result;
      } )
      .catch( ( error ) => {
        console.log( error );
      } )
    );
  } // /create

  static login( credentials ) {
    const endpoint = this.baseEndpoint + '/access-tokens';

    return (
      fetch(
        endpoint,
        {
          ...this.defaultFetchOptions,
          "method": "POST",
          "body": JSON.stringify( credentials )
        }
      )
      .then( this.checkStatus )
      .then( this.parseJSON )
      // .then( this.setIdentity )
      .then( ( result ) => {
        this.setIdentity( result );
        return result;
      } )
      .catch( ( error ) => {
        console.log( error );
      } )
    );
  } // /login

  static logout() {
    const endpoint = this.baseEndpoint + '/access-tokens';
    var identity = this.getIdentity();

    if ( !identity ) {
      return Promise.reject( new Error( 'User is not logged in' ) );
    }

    var body = { "refresh_token": identity.refresh_token };

    return (
      fetch(
        endpoint,
        {
          ...this.defaultFetchOptions,
          "method": "DELETE",
          "headers": {
            "Content-Type": "application/json",
            "X-Access-Token": identity.jwt
          },
          "body": JSON.stringify( body )
        }
      )
      .then( this.checkStatus )
      .then( this.parseJSON )
      .then( ( result ) => {
        this.clearIdentity();
        return result;
      } )
      .catch( ( error ) => {
        console.log( error );
      } )
    );
  } // /logout

  static refreshToken() {
    const endpoint = this.baseEndpoint + '/access-tokens/refresh';
    var identity = this.getIdentity();

    if ( !identity ) {
      return Promise.reject( new Error( 'User is not logged in' ) );
    }

    var body = { "refresh_token": identity.refresh_token };

    return (
      fetch(
        endpoint,
        {
          ...this.defaultFetchOptions,
          "method": "POST",
          "body": JSON.stringify( body )
        }
      )
      .then( this.checkStatus )
      .then( this.parseJSON )
      .then( ( result ) => {
        console.log( 'Refreshed token!' );
        this.setIdentity( {
          ...this.getIdentity(),
          "jwt": result.jwt
        } );
        return result;
      } )
      .catch( ( error ) => {
        console.log( error );
      } )
    );
  } // /refreshToken

  static profile() {
    const endpoint = this.baseEndpoint + '/me';
    var identity = this.getIdentity();

    if ( !identity ) {
      return Promise.reject( new Error( 'User is not logged in' ) );
    }

    return (
      fetch(
        endpoint,
        {
          ...this.defaultFetchOptions,
          "headers": {
            "Content-Type": "application/json",
            "X-Access-Token": identity.jwt
          }
        }
      )
      .then( this.checkStatus )
      .then( this.parseJSON )
      .then( ( result ) => {
        this.setProfile( result );
        return result;
      } )
      .catch( ( error ) => {
        // If unauthorized to get profile
        if ( error.response && error.response.hasOwnProperty( 'status' ) && ( error.response.status === 401 ) ) {
          console.log( 'Unauthorized!' );
          this.clearIdentity();
        }

        return error;
      } )
    );
  }

  constructor( credentials ) {
    super();

    this.credentials = credentials;

    return this;
  }

  _isLoggedIn = false;

  isLoggedIn() {
    var identity = User.getIdentity();

    if ( identity ) {
      if ( moment().diff( identity.expires, 'minutes' ) >= 10 ) {
        return false;
      }

      return true;
    }

    return false;
  }

  async profile() {
    var profile;

    if ( this.isLoggedIn() ) {
      return User.getProfile();
    }

    await User.profile()
      .then( ( result ) => {
        profile = result;
        return profile;
      } )
      .catch( ( error ) => {
        // console.log( error.response );
        return error;
      } )
    ;

    return profile;
  }

} // /User

export { User };

// -----------------------------------------------------------------------------

class Ideas extends API {
  static create( idea ) {
    const endpoint = this.baseEndpoint + '/ideas';
    var identity = this.getIdentity();

    if ( !identity ) {
      return Promise.reject( new Error( 'User is not logged in' ) );
    }

    return (
      fetch(
        endpoint,
        {
          ...this.defaultFetchOptions,
          "method": "POST",
          "headers": {
            "Content-Type": "application/json",
            "X-Access-Token": identity.jwt
          },
          "body": JSON.stringify( idea )
        }
      )
      .then( this.checkStatus )
      .then( this.parseJSON )
      .then( ( result ) => { return result; } )
      .catch( ( error ) => {
        console.log( error );
      } )
    );
  }

  static get() {
    const endpoint = this.baseEndpoint + '/ideas';
    var identity = this.getIdentity();

    if ( !identity ) {
      return Promise.reject( new Error( 'User is not logged in' ) );
    }

    return (
      fetch(
        endpoint,
        {
          ...this.defaultFetchOptions,
          "headers": {
            "Content-Type": "application/json",
            "X-Access-Token": identity.jwt
          }
        }
      )
      .then( this.checkStatus )
      .then( this.parseJSON )
      .then( ( result ) => { return result; } )
      .catch( ( error ) => {
        console.log( error );
      } )
    );
  }

  static destroy( id ) {
    const endpoint = this.baseEndpoint + '/ideas/' + id;
    var identity = this.getIdentity();

    if ( !identity ) {
      return Promise.reject( new Error( 'User is not logged in' ) );
    }

    return (
      fetch(
        endpoint,
        {
          ...this.defaultFetchOptions,
          "method": "DELETE",
          "headers": {
            "Content-Type": "application/json",
            "X-Access-Token": identity.jwt
          }
        }
      )
      .then( this.checkStatus )
      .then( this.parseJSON )
      .then( ( result ) => { return result; } )
      .catch( ( error ) => {
        console.log( error );
      } )
    );
  }
}

export { Ideas };

export default API;
