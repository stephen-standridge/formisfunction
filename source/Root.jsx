import React, { PropTypes, Component } from 'react';
import { Router, Route } from 'react-router';
import App from './App';
import Section from './containers/Section';

class Root extends Component {

  render() {
    const { history } = this.props;
    return (
      <Router history={history}>
        <Route name='navigation' path='/' component={App} >
          <Route name='section' path='/:endpoint' component={Section} />
        </Route>
      </Router>
    );
  }
}
Root.propTypes = {
  history: PropTypes.object.isRequired
}

export default Root