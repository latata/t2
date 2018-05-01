/* eslint-disable */

import 'normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery';
import 'bootstrap';
import 'react-select/dist/react-select.css';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

const rootElement = document.getElementById('root');

if (rootElement !== null) {
  ReactDOM.render(<App />, rootElement);
}

registerServiceWorker();
