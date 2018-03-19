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
      // "id": `temp-${Date.now()}`,
      "id": `temp-${ Math.random().toString().replace( '.', '' ) }`,
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
    return Promise.resolve( this.state.ideas );
  };

  finishIdea = ( index, idea ) => {
    const ideas = [ ...this.state.ideas ];

    return API.Ideas.create( idea ).then( ( result ) => {
      // console.log( 'finishIdea → then' );
      // console.log( 'index', index );

      ideas[index] = result; // will contain actual id, created_at
      this.setState( { ideas } );
      return this.state.ideas;
    } );
  }

  addIdea = ( idea ) => {
    const ideas = [ ...this.state.ideas ];
    ideas.unshift( idea );

    return API.Ideas.create( idea ).then( () => {
      this.setState( { ideas } );
      return this.state.ideas;
    } );
  };

  updateIdea = ( key, updatedIdea ) => {
    const ideas = [ ...this.state.ideas ];
    ideas[key] = updatedIdea;

    return API.Ideas.update( key, updatedIdea ).then( () => {
      this.setState( { ideas } );
      return this.state.ideas;
    } );
  };

  getIdeas = () => {
    return API.Ideas.get().then( ( ideas ) => {
      this.setState( { ideas } );
      return this.state.ideas;
    } );
  };

  deleteIdea = ( key, id ) => {
    const ideas = [ ...this.state.ideas ];
    ideas.splice( key, 1 );

    if ( id ) {
      return API.Ideas.destroy( id ).then( () => {
        this.setState( { ideas } );
        return this.state.ideas;
      } );
    }

    this.setState( { ideas } );
    return Promise.resolve( this.state.ideas );
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
