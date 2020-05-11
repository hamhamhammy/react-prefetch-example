import React, { Component } from 'react';

import styles from './Home.module.scss';

export default class Home extends Component {
  static prefetch (store) {
    console.log('Homepage prefetch', store);
  }

  render () {
    return (
      <div className={styles.HOME}>Hello Homepage</div>
    )
  }
}
