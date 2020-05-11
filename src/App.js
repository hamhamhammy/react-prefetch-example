import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import routes from './router';

import './styles/global.scss';
import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.APP}>
      <Router>
        <div className={styles['APP-HEADER']}>App Header</div>
        <div className={styles['APP-CONTENT']}>
          {
            // <Switch> looks through its children <Route>s and
            // renders the first one that matches the current URL.
          }
          <Switch>
            {routes.map((route, i) => (
              <Route
                key={i}
                path={route.path}
                render={props => (
                  // pass the sub-routes down to keep nesting
                  <route.component {...props} routes={route.routes} />
                )}
              />
            ))}
          </Switch>
        </div>
        <div className={styles['APP-FOOTER']}>App Footer</div>
      </Router>
    </div>
  );
}

export default App;
