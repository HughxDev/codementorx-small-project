import React from 'react';
import ReactDOM from 'react-dom';
import Router from './components/Router';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render( <Router />, document.getElementById( 'root' ) );
registerServiceWorker();
