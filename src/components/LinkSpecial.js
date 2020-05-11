import React, { Component } from 'react';
import {
  withRouter,
} from 'react-router-dom';

import { doPrefetch } from '@/router-utils';

class LinkSpecial extends Component {
  onClick = (e) => {
    e.preventDefault();
    // Do the prefetch here
    doPrefetch(this.props.to, (results) => {
      console.log('prefetch results = ', results);
      // Do the actual redirect - https://tylermcginnis.com/react-router-programmatically-navigate/
      this.props.history.push(this.props.to);
    });
  }

  render () {
    // Return anchor for routing
    return (
      <a
          href={this.props.to}
          onClick={this.onClick}>
        {this.props.children}
      </a>
    );
  }
}

export default withRouter(LinkSpecial);
