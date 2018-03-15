import React, { Component } from 'react';
import Header from '../Header';
import IdeaList from '../IdeaList';
import './index.css';

class Dashboard extends Component {
  state = {
    "ideas": []
  }

  addIdea = ( idea ) => {
    const ideas = [ ...this.state.ideas ];
    ideas.unshift( idea );
    this.setState( { ideas } );
  };

  updateIdea = ( key, updatedIdea ) => {
    const ideas = [ ...this.state.ideas ];
    ideas[key] = updatedIdea;
    this.setState( { ideas } );
  };

  deleteIdea = ( key ) => {
    const ideas = [ ...this.state.ideas ];
    ideas.splice( key, 1 );
    this.setState( { ideas } );
  };

  render() {
    return (
      <React.Fragment>
        <Header
          addIdea={ this.addIdea }
          ideas={ this.state.ideas }
        />
        <IdeaList
          addIdea={ this.addIdea }
          updateIdea={ this.updateIdea }
          deleteIdea={ this.deleteIdea }
          ideas={ this.state.ideas }
        />
      </React.Fragment>
    );
  }
}

export default Dashboard;
