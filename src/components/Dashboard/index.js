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
    var blankIdea = {
      // "id": `temp-${Date.now()}`,
      // "id": `temp-${ Math.random().toString().replace( '.', '' ) }`,
      "content": "[blank content]",
      "impact": 10,
      "ease": 10,
      "confidence": 10,
      "average_score": 10,
      "created_at": 0,
      // "_isNew": true
    };
    // ideas.unshift( idea );
    // this.setState( { ideas } );
    // return Promise.resolve( ideas ); //this.state.ideas

    return API.Ideas.create( blankIdea ).then( ( idea ) => {
      const ideas = [ ...this.state.ideas ];
      idea.content = '';
      idea._isNew = true;
      ideas.unshift( idea );
      this.setState( { ideas } );

      return this.state.ideas;
    } );
  };

  // finishIdea = ( index, idea ) => {
  //   // const ideas = [ ...this.state.ideas ];
  //
  //   // if ( idea.content  )
  //
  //   // return API.Ideas.create( idea ).then( ( result ) => {
  //   //   // console.log( 'finishIdea → then' );
  //   //   // console.log( 'index', index );
  //   //
  //   //   ideas[index] = result; // will contain actual id, created_at
  //   //   this.setState( { ideas } );
  //   //   return this.state.ideas;
  //   // } );
  //   return this.updateIdea( index, idea );
  // }

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
      ideas = ideas.map( ( idea ) => {
        idea._isNew = false;
        return idea;
      } );
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
        <Header beginIdea={ this.beginIdea } />
        <Ideas
          // finishIdea={ this.finishIdea }
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
