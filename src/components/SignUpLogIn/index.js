import React, { Component } from 'react';
import './index.css';

class SignUpLogIn extends Component {
  constructor ( props ) {
    super( props );

    this.state = {
      "isSignUpDialog": true,
      "formData": {
        "name": "",
        "email": "",
        "password": ""
      }
    };
  }

  showLogInDialog = () => {
    this.setState( {
      "isSignUpDialog": false
    } );
  };

  showSignUpDialog = () => {
    this.setState( {
      "isSignUpDialog": true
    } );
  };

  isSignUpDialog = () => {
    return this.state.isSignUpDialog;
  };

  getClassNames = () => {
    var baseClassName = 'cxsp-authenticate';
    var modifiers = ' ';

    if ( this.isSignUpDialog() ) {
      modifiers += `${baseClassName}--sign-up`;
    } else {
      modifiers += `${baseClassName}--log-in`;
    }

    return `${baseClassName}${modifiers}`;
  };

  handleChange = ( event ) => {
    const formData = { ...this.state.formData };
    var key = event.target.name;
    var newValue = event.target.value;

    formData[key] = newValue;
    this.setState( { formData } );
    // console.log( this.state.formData );
  };

  handleSubmit = ( event ) => {
    event.preventDefault();

    if ( this.isSignUpDialog() ) {
      this.props.signUp( this.state.formData );
    } else {
      this.props.logIn( this.state.formData );
    }
  };

  /*
    Placeholders-as-labels is bad practice. See the spec:
      https://html.spec.whatwg.org/multipage/input.html#the-placeholder-attribute:attr-input-placeholder-2
    @todo Replace with floating labels:
      https://github.com/code-kotis/react-floating-label
  */
  render() {
    return (
      <div className={ this.getClassNames() }>
        <h2 className="cxsp-heading cxsp-authenticate__heading">{ this.isSignUpDialog() ? 'Sign Up' : 'Log In' }</h2>
        <form className="cxsp-form cxsp-authenticate__form" onSubmit={ this.handleSubmit }>
          <div className="cxsp-form-group" hidden={ !this.isSignUpDialog() }>
            <input
              className="cxsp-form-control"
              type="text"
              name="name"
              placeholder="Name"
              value={ this.state.formData.name }
              onChange={ this.handleChange }
              autoComplete="name"
              disabled={ !this.isSignUpDialog() }
              required
            />
          </div>
          <div className="cxsp-form-group">
            <input
              className="cxsp-form-control"
              type="email"
              name="email"
              placeholder="Email"
              value={ this.state.formData.email }
              onChange={ this.handleChange }
              autoComplete="email"
              required
            />
          </div>
          <div className="cxsp-form-group">
            <input
              className="cxsp-form-control"
              type="password"
              name="password"
              minLength="8"
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$"
              title="At least 8 characters, with 1 uppercase letter, 1 lowercase letter, and 1 number"
              placeholder="Password"
              value={ this.state.formData.password }
              onChange={ this.handleChange }
              autoComplete="current-password"
              required
            />
          </div>
          <div className="cxsp-form-group cxsp-form-group--submit" hidden={ !this.isSignUpDialog() }>
            <button type="submit" className="cxsp-button cxsp-authenticate__submit">Sign Up</button>
            <p className="cxsp-authenticate__switch-mode">Already have an account? <a href="javascript:void(0);" onClick={ this.showLogInDialog }>Log in</a></p>
          </div>
          <div className="cxsp-form-group cxsp-form-group--submit" hidden={ this.isSignUpDialog() }>
            <button type="submit" className="cxsp-button cxsp-authenticate__submit">Log In</button>
            <p className="cxsp-authenticate__switch-mode">Don’t have an account? <a href="javascript:void(0);" onClick={ this.showSignUpDialog }>Create an account</a></p>
          </div>
        </form>
      </div>
    );
  }
}

export default SignUpLogIn;
