import React, { PropTypes } from 'react';
import MainNavigation from './components/MainNavigation';
import SectionBody from './components/Section';
import DocumentTitle from 'react-document-title';
import CSS from '../dist/main.css'

class App {
  render() {
    return (
      <DocumentTitle title='Form Is Function'>
        <div className='App main__wrapper'>
          <MainNavigation {...this.props} />
          {this.renderChildrenOrHome()}
        </div>
      </DocumentTitle>
    );
  }
  renderChildrenOrHome(){
    return this.props.children ? this.props.children : <SectionBody section={'greeting'} />
  }
}

App.propTypes = {
  children: PropTypes.object
};

export default App