import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.css';

class Idea extends Component {
  static propTypes = {
    "idea": PropTypes.shape( {
      "content": PropTypes.string,
      "impact": PropTypes.number,
      "ease": PropTypes.number,
      "confidence": PropTypes.number,
    } ),
    "updateIdea": PropTypes.func,
    "deleteIdea": PropTypes.func
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
      ...this.props.idea,
      [ event.currentTarget.name ]: value
    };

    this.props.updateIdea( this.props.index, updatedIdea );
  };

  handleDelete = ( event ) => {
    this.props.deleteIdea( this.props.index );
  };

  render() {
    var possibleRankings = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
    var rankings = possibleRankings.map( ( number ) => <option key={ number }>{ number }</option> );
    var idea = this.props.ideas[this.props.index]; //idea;

    return (
      <tr className="cxsp-ideas__idea">
        <td className="cxsp-ideas__column-content cxsp-idea__datum cxsp-idea__datum--content">
          <input
            className="cxsp-form-control cxsp-form-control--text cxsp-form-control--idea-content"
            type="text"
            name="content"
            value={ idea.content }
            maxLength="255"
            onChange={ this.handleChange }
          />
        </td>
        <td className="cxsp-ideas__column-impact cxsp-idea__datum cxsp-idea__datum--impact">
          <select
            className="cxsp-form-control cxsp-form-control--small-font cxsp-form-control--ranking"
            name="impact"
            value={ idea.impact }
            onChange={ this.handleChange }
          >
            { rankings }
          </select>
        </td>
        <td className="cxsp-ideas__column-ease cxsp-idea__datum cxsp-idea__datum--ease">
          <select
            className="cxsp-form-control cxsp-form-control--small-font cxsp-form-control--ranking"
            name="ease"
            value={ idea.ease }
            onChange={ this.handleChange }
          >
            { rankings }
          </select>
        </td>
        <td className="cxsp-ideas__column-confidence cxsp-idea__datum cxsp-idea__datum--confidence">
          <select
            className="cxsp-form-control cxsp-form-control--small-font cxsp-form-control--ranking"
            name="confidence"
            value={ idea.confidence }
            onChange={ this.handleChange }
          >
            { rankings }
          </select>
        </td>
        <td className="cxsp-ideas__column-average cxsp-idea__datum cxsp-idea__datum--average">
          <output className="cxsp-form-control cxsp-form-control--small-font">{ Math.round( ( idea.impact + idea.ease + idea.confidence ) / 3 ) }</output>
        </td>
        <td className="cxsp-ideas__column-actions cxsp-idea__datum cxsp-idea__datum--actions">
          <button
            className="cxsp-button cxsp-button--idea-action cxsp-idea__action cxsp-idea__action--accept"
            title="Accept"
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
            width="18"
            height="18"
            title="Cancel"
            onClick={ this.handleDelete }
          >
            <img
              className="cxsp-idea-action__icon"
              src="/images/x.png"
              srcSet="/images/x.png 1x, /images/x@2x.png 2x"
              alt="✖"
            />
          </button>
        </td>
      </tr>
    );
  }
}

export default Idea;
