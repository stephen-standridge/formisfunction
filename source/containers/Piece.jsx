import React from 'react';
import PieceStore from '../stores/PieceStore';
import connectToStores from '../utils/connectToStores';

function parsePiece(params) {
  return params.piece;
}
function parsePieceLocation(params) {
  return `${params.section}/${params.piece}`;
}

function requestData(props) {
  const location = parsePieceLocation(props.params);

  PieceActionCreators.requestPiece(location, ['name']);
}
function present(props) {
  const piece = parsePiece(props.params);
  const currentPiece = PieceStore.get(piece);

  return {
    currentPiece
  };
}
class Piece extends React.Component {
  componentWillMount() {
    console.log(this.props)
    requestData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (parsePiece(nextProps.params) !== parsePiece(this.props.params)) {
      requestData(nextProps);
    }
  }	
	render(){
		return ( <div>
      {this.props.currentPiece}
    </div> )
	}
}

Piece.propTypes = {
  // Injected by React Router:
  params: React.PropTypes.shape({
    section: React.PropTypes.string.isRequired,
    piece: React.PropTypes.string.isRequired
  }).isRequired,
  // Injected by connectToStores:
  currentPiece: React.PropTypes.object,
};

export default connectToStores([PieceStore], present)(Piece)
