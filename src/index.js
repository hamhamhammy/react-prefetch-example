import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import Device from './device';

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

render(App);

// Ensure hot module reload works
if (module.hot) {
  module.hot.accept('./App.js', () => {
    const AppNext = require('./App.js').default;
    render(AppNext);
  });
}
