import React from 'react';
import connectToStores from '../utils/connectToStores';
import ApplicationStore from '../stores/ApplicationStore';
import * as PiecesActionCreators from '../actions/PiecesActionCreators';
import PieceDisplay from '../components/PieceDisplay';
import DocumentTitle from 'react-document-title';

function parseEndpoint(params) {	
  return params.endpoint || 'welcome';
}

function requestData(props) {
  const endpoint = parseEndpoint(props.params);
  PiecesActionCreators.requestPiecesOrPiece( endpoint );
}
function present(props) {
  const currentPiece = ApplicationStore.currentPiece();
  const currentSection = ApplicationStore.currentSection();
  const displayedPiece = ApplicationStore.displayedPiece();

  return {
    displayedPiece,
    currentPiece,
    currentSection
  };
}

class Piece extends React.Component {
  componentWillMount() {
    requestData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (parseEndpoint(nextProps.params) !== parseEndpoint(this.props.params)) {
      requestData(nextProps);
    }
  }	
	render(){
    const section = this.props.currentSection;
		return <DocumentTitle title={`Form Is Function :: ${section}`}>
			<PieceDisplay {...this.props} ></PieceDisplay>
		</DocumentTitle>
	}
}

Piece.propTypes = {
  // Injected by React Router:
  params: React.PropTypes.shape({
    endpoint: React.PropTypes.string.isRequired
  }).isRequired,

  // Injected by connectToStores:
  currentSection: React.PropTypes.string,
  currentPiece: React.PropTypes.string,
  displayedPiece: React.PropTypes.object,
};

export default connectToStores([ApplicationStore], present)( Piece )
