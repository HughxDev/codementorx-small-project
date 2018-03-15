import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.css';

class Idea extends Component {
  static propTypes = {
    "idea": PropTypes.shape( {
      "text": PropTypes.string,
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
    var possibleRankings = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
    var rankings = possibleRankings.map( ( number ) => <option key={ number }>{ number }</option> );
    var idea = this.props.idea;

    return (
      <tr>
        <td>
          <input type="text" name="text" value={ idea.text } onChange={ this.handleChange } />
        </td>
        <td>
          <select name="impact" value={ idea.impact } onChange={ this.handleChange }>{ rankings }</select>
        </td>
        <td>
          <select name="ease" value={ idea.ease } onChange={ this.handleChange }>{ rankings }</select>
        </td>
        <td>
          <select name="confidence" value={ idea.confidence } onChange={ this.handleChange }>{ rankings }</select>
        </td>
        <td>
          <output>{ Math.round( ( idea.impact + idea.ease + idea.confidence ) / 3 ) }</output>
        </td>
        <td>
          <button>✔</button>
          <button onClick={ this.handleDelete }>✖</button>
        </td>
      </tr>
    );
  }
}

export default Idea;
