import React, { PropTypes, Component } from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import App from './App';
import Piece from './containers/Piece';

class Root extends Component {

  render() {
    const { history } = this.props;
    return (
      <Router history={history}>
        <Route name='navigation' path='/' component={App} >
          // <IndexRoute component={Piece}/>
          <Route name='endpoint' path='/:endpoint' component={Piece} />
        </Route>
      </Router>
    );
  }
}
Root.propTypes = {
  history: PropTypes.object.isRequired
}

export default Root