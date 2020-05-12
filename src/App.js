import React, { Component } from 'react';
import { hot } from 'react-hot-loader'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import { doPrefetch } from './router-utils';

import LinkSpecial from '@/components/LinkSpecial';

import routes from './router';

import './styles/global.scss';
import styles from './App.module.scss';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      count: 1,
      prefetchLoading: true,
      prefetchError: false,
    };
  }

  increaseCount = () => {
    console.log('increaseCount lol');
    this.setState((state) => {
      return {
        count: state.count + 1
      };
    });
  }

  componentDidMount () {
    // Do initial prefetch
    doPrefetch(window.location.pathname, () => {
      this.setState({
        prefetchLoading: false,
      });
    }, () => {
      this.setState({
        prefetchLoading: false,
        prefetchError: true,
      });
    });
  }

  render () {
    const { prefetchLoading, prefetchError } = this.state;

    if (prefetchLoading) {
      return <div>Loading...</div>
    } else if (prefetchError) {
      return <div>Error - initial prefetch</div>
    }

    return (
      <div className={styles.APP}>
        <Router>
          <div className={styles['APP-HEADER']}>
            App Header - {process.env.NODE_ENV}
            <br/>
            <LinkSpecial to='/services'>
              /services
            </LinkSpecial>
            <br/>
            <LinkSpecial to='/services/c/hvac-installation/1234567'>
              /services/c/hvac-installation/1234567
            </LinkSpecial>
            <div>
              <span>{this.state.count}</span>
              <button onClick={this.increaseCount}>Increase Count</button>
            </div>
          </div>
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
                  exact // disables partial route matching
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
}

export default process.env.NODE_ENV === 'development' ? hot(module)(App) : App;