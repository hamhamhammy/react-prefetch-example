import React, { Component } from 'react';

import styles from './Home.module.scss';

export default class Home extends Component {
  static prefetch (store) {
    return new Promise((resolve) => {
      console.log('Home store = ', store);
      setTimeout(() => {
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
      <div className={styles.HOME}>Hello Home</div>
    )
  }
}
