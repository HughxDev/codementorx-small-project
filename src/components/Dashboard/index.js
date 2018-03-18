import React, { Component } from 'react';
import Header from '../Header';
import Ideas from '../Ideas';
import * as API from '../API';
import './index.css';

class Dashboard extends Component {
  constructor( props ) {
    super( props );

    this.state = {
      "ideas": []
    };

    // this.getIdeas();
  }

  beginIdea = () => {
    var idea = {
      "id": `temp-${Date.now()}`,
      "content": "",
      "impact": 10,
      "ease": 10,
      "confidence": 10,
      "average_score": 10,
      "created_at": 0
    };

    const ideas = [ ...this.state.ideas ];
    ideas.unshift( idea );

    // console.log( ideas );

    this.setState( { ideas } );
  };

  finishIdea = ( key, idea ) => {
    const ideas = [ ...this.state.ideas ];

    API.Ideas.create( idea ).then( ( result ) => {
      ideas[key] = result; // will contain actual id, created_at

      this.setState( { ideas } );
    } );
  }

  addIdea = ( idea ) => {
    const ideas = [ ...this.state.ideas ];
    ideas.unshift( idea );

    API.Ideas.create( idea ).then( () => {
      this.setState( { ideas } );
    } );
  };

  updateIdea = ( key, updatedIdea ) => {
    const ideas = [ ...this.state.ideas ];
    ideas[key] = updatedIdea;

    API.Ideas.update( key, updatedIdea ).then( () => {
      this.setState( { ideas } );
    } );
  };

  getIdeas = () => {
    API.Ideas.get().then( ( ideas ) => {
      this.setState( { ideas } );
    } );
  };

  deleteIdea = ( key, id ) => {
    const ideas = [ ...this.state.ideas ];
    ideas.splice( key, 1 );

    if ( id ) {
      API.Ideas.destroy( id ).then( () => {
        this.setState( { ideas } );
      } );
    } else {
      this.setState( { ideas } );
    }
  };

  componentDidMount() {
    this.getIdeas();
  }

  render() {
    return (
      <React.Fragment>
        <Header
          beginIdea={ this.beginIdea }
          ideas={ this.state.ideas }
        />
        <Ideas
          finishIdea={ this.finishIdea }
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
