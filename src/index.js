import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import Device from './device';

import { doPrefetch } from './router-utils';

import './index.css';
import App from './App';

const device = new Device();
device.init(store);

const render = Component => {
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}> {/* This enables the redux store for the entire application */}
        <Component />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
}

// Do initial prefetch
doPrefetch(window.location.pathname, (results) => {
  console.log('prefetch results = ', results);
  render(App);
}, () => {
  window.alert('prefetch failed, we should render 404 component here');
});

// Ensure hot module reload works
if (module.hot) {
  module.hot.accept('./App.js', () => {
    const AppNext = require('./App.js').default;
    render(AppNext);
  });
}
