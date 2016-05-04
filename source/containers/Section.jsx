import React from 'react';
import connectToStores from '../utils/connectToStores';
import PieceStore from '../stores/PieceStore';
import * as PiecesActionCreators from '../actions/PiecesActionCreators';
import SectionBody from '../components/Section';
import DocumentTitle from 'react-document-title';

function parseEndpoint(params) {	
  return params.section;
}

function requestData(props) {
  const endpoint = parseEndpoint(props.params);

  PiecesActionCreators.requestPiecesOrPiece(endpoint, ['name']);
}
function present(props) {
  const section = parseEndpoint(props.params);
  console.log(PieceStore.get('ryb'))
  const currentPiece = PieceStore.get(section);
  return {
    currentPiece
  };
}

class Section extends React.Component {
  componentWillMount() {
    requestData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (parseEndpoint(nextProps.params) !== parseEndpoint(this.props.params)) {
      requestData(nextProps);
    }
  }	
	render(){
    const section = parseEndpoint(this.props.params);
		return <DocumentTitle title={`Form Is Function :: ${section}`}>
			<SectionBody {...this.props.currentSection} >{ this.props.children }</SectionBody>
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

export default connectToStores([PieceStore], present)( Section )
