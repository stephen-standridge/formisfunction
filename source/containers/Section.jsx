import React from 'react';
import connectToStores from '../utils/connectToStores';
import SectionStore from '../stores/SectionStore';
import * as SectionActionCreators from '../actions/SectionActionCreators';
import SectionBody from '../components/Section';
import DocumentTitle from 'react-document-title';

function parseSection(params) {	
  return params.section;
}

function requestData(props) {
  const section = parseSection(props.params);

  SectionActionCreators.requestSection(section, ['name']);
}
function present(props) {
  const section = parseSection(props.params);
  const currentSection = SectionStore.get(section);
  return {
    currentSection
  };
}

class Section extends React.Component {
  componentWillMount() {
    requestData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (parseSection(nextProps.params) !== parseSection(this.props.params)) {
      requestData(nextProps);
    }
  }	
	render(){
    const section = parseSection(this.props.params);
		return <DocumentTitle title={`Form Is Function :: ${section}`}>
			<SectionBody {...this.props.currentSection} ></SectionBody>
		</DocumentTitle>
	}
}

Section.propTypes = {
  // Injected by React Router:
  params: React.PropTypes.shape({
    section: React.PropTypes.string.isRequired
  }).isRequired,

  // Injected by connectToStores:
  currentSection: React.PropTypes.object,
};

export default connectToStores([SectionStore], present)( Section )
