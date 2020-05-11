import React, { Component } from 'react';

import styles from './NationalService.module.scss';

export default class NationalService extends Component {
  static prefetch (store) {
    return new Promise((resolve) => {
      console.log('NationalService store = ', store);
      setTimeout(() => {
        resolve('NationalService prefetch');
      }, 200);
    });
  }

  render () {
    return (
      <div className={styles.SERVICE}>Hello NationalService</div>
    )
  }
}
