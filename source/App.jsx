import React, { PropTypes } from 'react';
import MainNavigation from './components/MainNavigation';
import PieceDisplay from './components/PieceDisplay';
import DocumentTitle from 'react-document-title';
require('./stylesheets/core.scss')
require('./stylesheets/typography.scss');
require('./stylesheets/parts.scss');
require('./stylesheets/pieces.scss');

class App {
  render() {
    return (
      <DocumentTitle title='Form Is Function'>
        <div className='App main__wrapper'>
          <MainNavigation {...this.props} />
          {this.props.children}
        </div>
      </DocumentTitle>
    );
  }
}

App.propTypes = {
  children: PropTypes.object
};

export default App