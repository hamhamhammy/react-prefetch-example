import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'

import rootReducer from './reducers';
import { sagaCategories } from './sagas'

// saga - create the middleware
const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(sagaMiddleware), // saga - mount onto the Store
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), // For browser extension
  ),
);

// saga - run
sagaMiddleware.run(sagaCategories);


export default store;
