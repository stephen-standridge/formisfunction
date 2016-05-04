import React, { PropTypes, Component } from 'react';
import { Router, Route } from 'react-router';

import App from './App';
import Section from './containers/Section';
import Piece from './containers/Piece';
// import RepoPage from './pages/RepoPage';
// import UserPage from './pages/UserPage';

class Root extends Component {

  render() {
    const { history } = this.props;
    return (
      <Router history={history}>
        <Route name='navigation' path='/' component={App} >
          <Route name='section' path='/:section' component={Section} />
        </Route>
      </Router>
    );
  }
}
Root.propTypes = {
  history: PropTypes.object.isRequired
}

export default Root