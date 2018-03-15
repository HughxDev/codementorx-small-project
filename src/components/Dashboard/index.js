import React, { Component } from 'react';
import Header from '../Header';
import Ideas from '../Ideas';
import './index.css';

class Dashboard extends Component {
  state = {
    "ideas": {}
  }

  addIdea = ( key, idea ) => {
    const ideas = { ...this.state.ideas };
    ideas[key] = idea;
    this.setState( { ideas } );
  };

  updateIdea = ( key, updatedIdea ) => {
    const ideas = { ...this.state.ideas };
    ideas[key] = updatedIdea;
    this.setState( { ideas } );
  };

  deleteIdea = ( key ) => {
    const ideas = { ...this.state.ideas };
    // ideas[key] = null;
    delete ideas[key];
    this.setState( { ideas } );
  };

  render() {
    return (
      <div className="cxsp-dashboard">
        <div className="cxsp-dashboard__inner">
          <Header
            addIdea={ this.addIdea }
            ideas={ this.state.ideas }
          />
          <Ideas
            addIdea={ this.addIdea }
            updateIdea={ this.updateIdea }
            deleteIdea={ this.deleteIdea }
            ideas={ this.state.ideas }
          />
        </div>
      </div>
    );
  }
}

export default Dashboard;
