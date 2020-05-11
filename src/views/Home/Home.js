import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './Home.module.scss';

function mapStateToProps (state) {
  const { categories: { serviceCategories } } = state;
  return { serviceCategories };
}

class Home extends Component {
  static prefetch ({ store }) {
    return new Promise((resolve) => {
      console.log('Home store = ', store);
      setTimeout(() => {
        store.dispatch({
          type: 'SET_CATEGORIES',
          payload: {
            categories: ['foo', 'bar', 'baz'],
          },
        });
        resolve('Home prefetch');
      },   {
        path: '/services',
        name: 'homepage',
        component: Home,
      },);
    })
  }

  render () {
    return (
      <div className={styles.HOME}>
        Hello Home<br/>
        {this.props.serviceCategories.map((cat) => {
          return <li key={cat}>{cat}</li>
        })}
      </div>
    )
  }
}

export default connect(mapStateToProps)(Home);
