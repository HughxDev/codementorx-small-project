import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Bulb from '../Bulb';
import Idea from '../Idea';
import NoIdeas from '../NoIdeas';
import './index.css';

Modal.setAppElement( document.getElementById( 'root' ) );

class Ideas extends Component {
  constructor( props ) {
    super( props );

    this.state = {
      "isTransitioning": false,
      "modalIsOpen": false,
      "confirmDeleteCallback": this.defaultConfirmDeleteCallback,
      "cancelDeleteCallback": this.defaultCancelDeleteCallback,
    };
  }

  static propTypes = {
    "ideas": PropTypes.array,
    "updateIdea": PropTypes.func,
    "deleteIdea": PropTypes.func,
  };

  defaultConfirmDeleteCallback = () => {
    console.log( 'Confirmed deletion! (default callback)' );
    this.closeDeleteConfirmationDialog();
  };

  defaultCancelDeleteCallback = () => {
    console.log( 'Canceled deletion! (default callback)' );
    this.closeDeleteConfirmationDialog();
  };

  hasIdeas = () => {
    return ( Object.keys( this.props.ideas ).length > 0 );
  }

  ideaIsBeingAdded = () => {
    this.setState( {
      "isTransitioning": true
    } );
  };

  ideaWasAdded = () => {
    this.setState( {
      "isTransitioning": false
    } );
  };

  ideaIsBeingRemoved = () => {
    this.setState( {
      "isTransitioning": true
    } );
  };

  ideaHasBeenRemoved = () => {
    this.setState( {
      "isTransitioning": false
    } );
  };

  openDeleteConfirmationDialog = ( confirmCallback, cancelCallback ) => {
    var state = {
      "modalIsOpen": true,
    };

    if ( confirmCallback ) {
      state.confirmDeleteCallback = () => {
        console.log( 'Confirmed deletion!' );
        confirmCallback();
        this.closeDeleteConfirmationDialog();
      };
    }

    if ( cancelCallback ) {
      state.cancelDeleteCallback = () => {
        console.log( 'Canceled deletion!' );
        cancelCallback();
        this.closeDeleteConfirmationDialog();
      };
    }

    this.setState( state );
  };

  afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
  };

  closeDeleteConfirmationDialog = () => {
    this.setState( {
      modalIsOpen: false,
      "confirmDeleteCallback": this.defaultConfirmDeleteCallback,
      "cancelDeleteCallback": this.defaultCancelDeleteCallback,
    } );
  };

  render() {
    return (
      <main className="cxsp-ideas">
        <Modal
          isOpen={ this.state.modalIsOpen }
          onAfterOpen={ this.afterOpenModal }
          onRequestClose={ this.closeModal }
          contentLabel="Confirm Deletion"
          className="cxsp-modal"
          overlayClassName="cxsp-modal-overlay"
        >
          <h2 className="cxsp-heading cxsp-modal__heading">Are you sure?</h2>
          <div className="cxsp-modal__info">
            <p>This idea will be permanently deleted.</p>
          </div>
          <div className="cxsp-button-group cxsp-modal__button-group">
            <button className="cxsp-button cxsp-button--inverted cxsp-button--inverted-muted cxsp-modal__button" onClick={ this.state.cancelDeleteCallback }>Cancel</button>
            <button className="cxsp-button cxsp-button--inverted cxsp-modal__button" onClick={ this.state.confirmDeleteCallback }>OK</button>
          </div>
        </Modal>
        <table hidden={ !this.state.isTransitioning && !this.hasIdeas() }>
          <thead>
            <tr>
              <th className="cxsp-table-heading cxsp-ideas__column-content" scope="col">
                <span className="cxsp-visually-hidden">Content</span>
              </th>
              <th className="cxsp-table-heading cxsp-ideas__column-impact" scope="col">
                Impact
              </th>
              <th className="cxsp-table-heading cxsp-ideas__column-ease" scope="col" scope="col">
                Ease
              </th>
              <th className="cxsp-table-heading cxsp-ideas__column-confidence" scope="col" scope="col">
                Confidence
              </th>
              <th className="cxsp-table-heading cxsp-ideas__column-average" scope="col">
                <abbr>Avg.</abbr>
              </th>
              <th className="cxsp-table-heading cxsp-ideas__column-actions" scope="col">
                <span className="cxsp-visually-hidden">Actions</span>
              </th>
            </tr>
          </thead>
          <TransitionGroup component="tbody">
            { this.props.ideas.map( ( idea, key ) => {
              return (
                <CSSTransition
                  classNames="cxsp-ideas__idea-"
                  key={ idea.id }
                  timeout={ {
                    "enter": 500,
                    "exit": 500
                  } }
                  onEnter={ this.ideaIsBeingAdded }
                  onEntered={ this.ideaWasAdded }
                  onExit={ this.ideaIsBeingRemoved }
                  onExited={ this.ideaHasBeenRemoved }
                  unmountOnExit={ true }
                >
                  <Idea
                    key={ idea.id }
                    index={ key }
                    idea={ idea }
                    addIdea={ this.props.addIdea }
                    updateIdea={ this.props.updateIdea }
                    deleteIdea={ this.props.deleteIdea }
                    openDeleteConfirmationDialog={ this.openDeleteConfirmationDialog }
                  />
                </CSSTransition>
              );
            } ) }
          </TransitionGroup>
        </table>
        <NoIdeas hidden={ this.state.isTransitioning || this.hasIdeas() } />
      </main>
    );
  }
}

export default Ideas;
