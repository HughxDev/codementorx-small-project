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

  static isUnauthorizedError( error ) {
    return (
      error.hasOwnProperty( 'response' ) &&
      ( 'status' in error.response ) &&
      ( error.response.status === 401 )
    );
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

  static _getIdentity() {
    var identity = this._retrieve( 'identity' );

    if ( identity ) {
      identity.expires = moment( identity.expires );
    }

    return identity;
  }

  static _setIdentity( identity ) {
    identity.expires = moment().add( 10, 'minutes' ).format();

    return this._store( 'identity', identity );
  }

  static _clearIdentity() {
    return this._clear( 'identity' );
  }

  // profile Storage

  static _getProfile() {
    return this._retrieve( 'profile' );
  }

  static _setProfile( profile ) {
    return this._store( 'profile', profile );
  }

  static _clearProfile() {
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
        console.log( 'User created!' );
        this._setIdentity( result );
        return result;
      } )
      .catch( ( error ) => {
        console.log( error );
      } )
    );
  } // /create

  static logIn( credentials ) {
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
      // .then( this._setIdentity )
      .then( ( result ) => {
        console.log( 'Logged in!' );
        this._setIdentity( result );
        return result;
      } )
      .catch( ( error ) => {
        console.log( error );
      } )
    );
  } // /logIn

  static logOut() {
    const endpoint = this.baseEndpoint + '/access-tokens';
    var identity = this._getIdentity();

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
        console.log( 'Logged out!' );
        this._clearIdentity();
        return result;
      } )
      .catch( ( error ) => {
        console.log( error );

        if ( this.isUnauthorizedError( error ) ) {
          console.log( 'Unauthorized!' );
          // this._clearIdentity();
          return User.refreshToken().then( ( newIdentity ) => {
            return User.logOut();
          } );
        }
      } )
    );
  } // /logOut

  static refreshToken() {
    const endpoint = this.baseEndpoint + '/access-tokens/refresh';
    var identity = this._getIdentity();

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
        var newIdentity = {
          ...this._getIdentity(),
          "jwt": result.jwt
        };

        this._setIdentity( newIdentity );

        return newIdentity;
      } )
      .catch( ( error ) => {
        console.log( error );
      } )
    );
  } // /refreshToken

  static profile() {
    const endpoint = this.baseEndpoint + '/me';
    var identity = this._getIdentity();

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
        console.log( 'Fetched profile!' );
        this._setProfile( result );
        return result;
      } )
      .catch( ( error ) => {
        if ( this.isUnauthorizedError( error ) ) {
          console.log( 'Unauthorized!' );

          // this._clearIdentity();
          User.refreshToken().then( ( newIdentity ) => {
            return User.profile();
          } );
        }

        return error;
      } )
    );
  }

  static isLoggedIn() {
    return !!User._getIdentity();
  }

  static async getProfile() {
    var profile = null;

    if ( User.isLoggedIn() ) {
      profile = User._getProfile();

      if ( profile ) {
        return profile;
      }
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
    var identity = this._getIdentity();

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
      .then( ( result ) => {
        console.log( 'Idea created!' );
        console.log( result );

        return result;
      } )
      .catch( ( error ) => {
        console.log( error );

        if ( this.isUnauthorizedError( error ) ) {
          console.log( 'Unauthorized!' );
          // this._clearIdentity();
          return User.refreshToken().then( ( newIdentity ) => {
            return Ideas.create( idea );
          } );
        }
      } )
    );
  } // /create

  static update( id, idea ) {
    const endpoint = this.baseEndpoint + `/ideas/${id}`;
    var identity = this._getIdentity();

    if ( !identity ) {
      return Promise.reject( new Error( 'User is not logged in' ) );
    }

    return (
      fetch(
        endpoint,
        {
          ...this.defaultFetchOptions,
          "method": "PUT",
          "headers": {
            "Content-Type": "application/json",
            "X-Access-Token": identity.jwt
          },
          "body": JSON.stringify( idea )
        }
      )
      .then( this.checkStatus )
      .then( this.parseJSON )
      .then( ( result ) => {
        console.log( 'Idea updated!' );
        console.log( result );

        return result;
      } )
      .catch( ( error ) => {
        console.log( error );

        if ( this.isUnauthorizedError( error ) ) {
          console.log( 'Unauthorized!' );
          // this._clearIdentity();
          return User.refreshToken().then( ( newIdentity ) => {
            return Ideas.update( id, idea );
          } );
        }
      } )
    );
  } // /update

  static get( page ) {
    if ( !Number.isNaN( parseInt( page ) ) && page <= 0 ) {
      return Promise.reject( new Error( 'Parameter `page` must be greater than zero' ) );
    }

    const endpoint = this.baseEndpoint + '/ideas' + ( page ? `?page=${page}` : '' );
    var identity = this._getIdentity();

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
        console.log( 'Fetched ideas!' );
        console.log( result );

        return result;
      } )
      .catch( ( error ) => {
        console.log( error );

        if ( this.isUnauthorizedError( error ) ) {
          console.log( 'Unauthorized!' );
          // this._clearIdentity();
          return User.refreshToken().then( ( newIdentity ) => {
            return Ideas.get();
          } );
        }
      } )
    );
  } // /get

  static destroy( id ) {
    const endpoint = this.baseEndpoint + '/ideas/' + id;
    var identity = this._getIdentity();

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
      .then( ( result ) => {
        console.log( 'Idea deleted!' );
        console.log( result );

        return result;
      } )
      .catch( ( error ) => {
        console.log( error );

        if ( this.isUnauthorizedError( error ) ) {
          console.log( 'Unauthorized!' );
          // this._clearIdentity();
          return User.refreshToken().then( ( newIdentity ) => {
            return Ideas.destroy( id );
          } );
        }
      } )
    );
  } // /destroy
}

export { Ideas };

export default API;
