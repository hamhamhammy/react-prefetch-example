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
      console.log('Home prefetch store = ', store);
      setTimeout(() => {
        store.dispatch({
          type: 'SET_CATEGORIES',
          payload: {
            categories: ['foo', 'bar', 'baz'],
          },
        });
        resolve('Home prefetch');
      }, 200);
    })
  }

  constructor (props) {
    super(props);
    this.state = { name: 's' };
  }

  updateName = () => {
    this.setState((state) => {
      return {
        name: state.name + 's',
      };
    })
  }

  render () {
    return (
      <div className={styles.HOME}>
        <div>
          <span>1{this.state.name}</span>
          <button onClick={this.updateName}>Update name</button>
        </div>
        Hello Home1<br/>
        {this.props.serviceCategories.map((cat) => {
          return <li key={cat}>{cat}</li>
        })}
      </div>
    )
  }
}

export default connect(mapStateToProps)(Home);
