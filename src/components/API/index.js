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

  static setIdentity( identity ) {
    return localStorage.setItem( 'codementorx-small-project.identity', JSON.stringify( identity ) );
  }

  static getIdentity() {
    return JSON.parse( localStorage.getItem( 'codementorx-small-project.identity' ) );
  }

  static clearIdentity() {
    return localStorage.removeItem( 'codementorx-small-project.identity' );
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
      .then( ( result ) => { return result; } )
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
        console.log( 'Logged in!' );
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
          result
        } );
        return result;
      } )
      .catch( ( error ) => {
        console.log( error );
      } )
    );
  } // /refreshToken


} // /User

export { User };
export default API;
