import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './index.css';

class Idea extends Component {
  constructor( props ) {
    super( props );

    this.getIdea = () => {
      var idea;

      if ( ( 'state' in this ) && this.state.prospectiveIdea ) {
        idea = this.state.prospectiveIdea;
      } else {
        idea = this.props.idea;
      }

      return idea;
    };

    this.hasNoId = () => {
      var idea = this.getIdea();

      return ( !idea.hasOwnProperty( 'id' ) || !idea.id || ( idea.id.indexOf( 'temp-' ) === 0 ) );
    };

    this.hasPlaceholderContent = () => {
      var idea = this.getIdea();

      return ( idea.content.trim() === '[blank content]' );
    };

    this.hasNoContent = () => {
      var idea = this.getIdea();

      return ( !idea.hasOwnProperty( 'content' ) || !idea.content || ( `${idea.content}`.trim().length === 0 ) || this.hasPlaceholderContent() );
    };

    this.isNew = () => {
      var idea = this.getIdea();

      return !!idea._isNew;
    };

    this.state = {
      "isBeingEdited": this.isNew(),
      "prospectiveIdea": {
        ...this.props.idea
      },
      "idea": {
        ...this.props.idea
      }
    };

    this._ideaShape = {
      "id": PropTypes.string,
      "content": PropTypes.string,
      "impact": PropTypes.number,
      "ease": PropTypes.number,
      "confidence": PropTypes.number,
      "average_score": PropTypes.number,
      "created_at": PropTypes.number,
      "_isNew": PropTypes.bool,
    };
  }

  static propTypes = {
    "index": PropTypes.number,
    "idea": PropTypes.shape( this._ideaShape ),
    "addIdea": PropTypes.func, // Owner: Dashboard
    "updateIdea": PropTypes.func, // Owner: Dashboard
    "deleteIdea": PropTypes.func, // Owner: Dashboard
    "openDeleteConfirmationDialog": PropTypes.func, // Owner: Ideas
  };

  handleChange = ( event ) => {
    var value = event.currentTarget.value;

    switch ( event.currentTarget.name ) {
      case 'impact':
      case 'ease':
      case 'confidence':
        value = parseInt( value, 10 );
      break;
    }

    const updatedIdea = {
      ...this.state.prospectiveIdea,
      [ event.currentTarget.name ]: value
    };

    this.setState( {
      ...this.state,
      "prospectiveIdea": updatedIdea
    } );
  };

  handleEdit = () => {
    var prospectiveIdea = {
      ...this.state.prospectiveIdea
    };

    if ( this.hasPlaceholderContent() ) {
      prospectiveIdea.content = '';
    }

    this.setState( {
      ...this.state,
      prospectiveIdea,
      "isBeingEdited": true
    } );
  };

  handleDelete = () => {
    if ( this.hasNoContent() && this.isNew() ) {
      this.props.deleteIdea( this.props.index, this.state.idea.id );
    } else {
      // @todo: Trigger alert
      this.props.openDeleteConfirmationDialog( () => {
        this.props.deleteIdea( this.props.index, this.state.idea.id );
      } );
    }

    this.setState( {
      ...this.state,
      "isBeingEdited": false,
    } );
  };

  handleAccept = () => {
    var newIdea = {
      ...this.state.prospectiveIdea,
      "_isNew": false,
    };

    if ( this.hasNoContent() ) {
      newIdea.content = "[blank content]";
    }

    this.props.updateIdea( this.state.idea.id, newIdea );
      //.then( ( result ) => {} );

    this.setState( {
      ...this.state,
      "isBeingEdited": false,
      // "prospectiveIdea": this.state.idea
      "idea": newIdea
    } );
  };

  handleCancel = ( event ) => {
    if ( this.hasNoContent() && this.isNew() ) {
      this.handleDelete();
    } else {
      this.setState( {
        ...this.state,
        "isBeingEdited": false,
        "prospectiveIdea": this.state.idea
      } );
    }
  };

  render() {
    var possibleRankings = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
    var rankings = possibleRankings.map( ( number ) => <option key={ number }>{ number }</option> );

    return (
      <tr className="cxsp-ideas__idea">
        <td className="cxsp-ideas__column-content cxsp-idea__datum cxsp-idea__datum--content">
          <input
            className="cxsp-form-control cxsp-form-control--text cxsp-form-control--idea-content"
            type="text"
            name="content"
            value={ this.state.prospectiveIdea.content }
            maxLength="255"
            onChange={ this.handleChange }
            required
            hidden={ !this.state.isBeingEdited }
          />
          <output
            className="cxsp-form-control cxsp-form-control--text-output cxsp-form-control--idea-content"
            hidden={ this.state.isBeingEdited }
          >
            { this.state.idea.content }
          </output>
        </td>
        <td className="cxsp-ideas__column-impact cxsp-idea__datum cxsp-idea__datum--impact">
          <select
            className="cxsp-form-control cxsp-form-control--small-font cxsp-form-control--ranking"
            name="impact"
            value={ this.state.prospectiveIdea.impact }
            onChange={ this.handleChange }
            hidden={ !this.state.isBeingEdited }
          >
            { rankings }
          </select>
          <output
            className="cxsp-form-control cxsp-form-control--small-font cxsp-form-control--ranking-output"
            hidden={ this.state.isBeingEdited }
          >
            { this.state.idea.impact }
          </output>
        </td>
        <td className="cxsp-ideas__column-ease cxsp-idea__datum cxsp-idea__datum--ease">
          <select
            className="cxsp-form-control cxsp-form-control--small-font cxsp-form-control--ranking"
            name="ease"
            value={ this.state.prospectiveIdea.ease }
            onChange={ this.handleChange }
            hidden={ !this.state.isBeingEdited }
          >
            { rankings }
          </select>
          <output
            className="cxsp-form-control cxsp-form-control--small-font cxsp-form-control--ranking-output"
            hidden={ this.state.isBeingEdited }
          >
            { this.state.idea.ease }
          </output>
        </td>
        <td className="cxsp-ideas__column-confidence cxsp-idea__datum cxsp-idea__datum--confidence">
          <select
            className="cxsp-form-control cxsp-form-control--small-font cxsp-form-control--ranking"
            name="confidence"
            value={ this.state.prospectiveIdea.confidence }
            onChange={ this.handleChange }
            hidden={ !this.state.isBeingEdited }
          >
            { rankings }
          </select>
          <output
            className="cxsp-form-control cxsp-form-control--small-font cxsp-form-control--ranking-output"
            hidden={ this.state.isBeingEdited }
          >
            { this.state.idea.confidence }
          </output>
        </td>
        <td className="cxsp-ideas__column-average cxsp-idea__datum cxsp-idea__datum--average">
          <output
            className="cxsp-form-control cxsp-form-control--small-font cxsp-form-control--ranking-output"
          >
            { Math.round( ( this.state.prospectiveIdea.impact + this.state.prospectiveIdea.ease + this.state.prospectiveIdea.confidence ) / 3 ) }
          </output>
        </td>
        <td className="cxsp-ideas__column-actions cxsp-idea__datum cxsp-idea__datum--actions">
          <div className="cxsp-button-group" hidden={ !this.state.isBeingEdited }>
            <button
              className="cxsp-button cxsp-button--idea-action cxsp-idea__action cxsp-idea__action--accept"
              title="Accept"
              onClick={ this.handleAccept }
              disabled={ !this.state.isBeingEdited }
            >
              <img
                className="cxsp-idea-action__icon"
                width="21"
                height="16"
                src="/images/checkmark.png"
                srcSet="/images/checkmark.png 1x, /images/checkmark@2x.png 2x"
                alt="✔"
              />
            </button>
            <button
              className="cxsp-button cxsp-button--idea-action cxsp-idea__action cxsp-idea__action--cancel"
              title="Cancel"
              onClick={ this.handleCancel }
              disabled={ !this.state.isBeingEdited }
            >
              <img
                className="cxsp-idea-action__icon"
                width="18"
                height="18"
                src="/images/x.png"
                srcSet="/images/x.png 1x, /images/x@2x.png 2x"
                alt="✖"
              />
            </button>
          </div>
          <div className="cxsp-button-group cxsp-button-group--modify" hidden={ this.state.isBeingEdited }>
            <button
              className="cxsp-button cxsp-button--idea-action cxsp-idea__action cxsp-idea__action--edit"
              title="Edit"
              onClick={ this.handleEdit }
              disabled={ this.state.isBeingEdited }
            >
              <img
                className="cxsp-idea-action__icon"
                width="20"
                height="19"
                src="/images/pen.png"
                srcSet="/images/pen.png 1x, /images/pen@2x.png 2x"
                alt="pen icon"
              />
            </button>
            <button
              className="cxsp-button cxsp-button--idea-action cxsp-idea__action cxsp-idea__action--delete"
              title="Delete"
              onClick={ this.handleDelete }
              disabled={ this.state.isBeingEdited }
            >
              <img
                className="cxsp-idea-action__icon"
                width="16"
                height="20"
                src="/images/bin.png"
                srcSet="/images/bin.png 1x, /images/bin@2x.png 2x"
                alt="trash bin icon"
              />
            </button>
          </div>
        </td>
      </tr>
    );
  }
}

export default Idea;
