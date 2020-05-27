import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './Home.module.scss';

function mapStateToProps (state) {
  const { categories: { serviceCategories } } = state;
  return { serviceCategories };
}

class Home extends Component {
  // Redux store will dispatch async action, async action will get middleware by redux-saga
  static async prefetch ({ store }) {
    const categories = await new Promise((resolve, reject) => {
      store.dispatch({
        type: 'CATEGORIES_FETCH_REQUESTED',
        resolve,
        reject,
      });
    });
    console.log('prefetch done - new prefetch categories = ', categories);
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
        Hello Home<br/>
        {this.props.serviceCategories.map((cat) => {
          return <li key={cat.categoryName}>
            {cat.categoryName}<br/>
            {cat.pages.map((page) => {
              return <div key={page.slug} className="p-l-5">
                {page.serviceId}/{page.slug}
              </div>
            })}
          </li>
        })}
      </div>
    );
  }
}

export default connect(mapStateToProps)(Home);
