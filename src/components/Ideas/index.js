import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Bulb from '../Bulb';
import Idea from '../Idea';
import NoIdeas from '../NoIdeas';
import './index.css';

class Ideas extends Component {
  static propTypes = {
    "ideas": PropTypes.array,
    "updateIdea": PropTypes.func,
    "deleteIdea": PropTypes.func,
  };

  hasIdeas() {
    return ( Object.keys( this.props.ideas ).length > 0 );
  }

  render() {
    return (
      <main className="cxsp-ideas">
        <div hidden={ !this.hasIdeas() }>
          <table>
            <thead>
              <tr>
                <th scope="col">Idea</th>
                <th scope="col">Impact</th>
                <th scope="col">Ease</th>
                <th scope="col">Confidence</th>
                <th scope="col"><abbr>Avg.</abbr></th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              { this.props.ideas.map( ( idea, key ) => {
                // var idea = this.props.ideas[key];
                console.log(key);
                return (
                  <Idea
                    key={ key }
                    index={ key }
                    idea={ idea }
                    ideas={ this.props.ideas }
                    updateIdea={ this.props.updateIdea }
                    deleteIdea={ this.props.deleteIdea }
                  />
                );
              } ) }
            </tbody>
          </table>
        </div>
        <NoIdeas hidden={ this.hasIdeas() } />
      </main>
    );
  }
}

export default Ideas;
