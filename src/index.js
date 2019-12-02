/**
 * index.js
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {App} from './components/App/App';
import * as serviceWorker from './serviceWorker';
import './index.css';
import "antd/dist/antd.css";

/**
 * Entry point of the application, renders <App /> wrapped by BrowserRouter
 */
ReactDOM.render(
  <Router>
	<App/>
  </Router>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
if (process.env.NODE_ENV === 'development') {
  serviceWorker.unregister();
} else {
  serviceWorker.register();
}

