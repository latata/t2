// @flow

import 'normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery';
import 'bootstrap';
import React from 'react';
import ReactDOM from 'react-dom';
import './test.css';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

const rootElement = document.getElementById('root');

if (rootElement !== null) {
  ReactDOM.render(<App />, rootElement);
}

registerServiceWorker();
