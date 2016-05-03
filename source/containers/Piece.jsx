import React from 'react';
import PieceStore from '../stores/PieceStore';
import connectToStores from '../utils/connectToStores';

function parsePiece(params) {
  return params.piece;
}

function requestData(props) {
  const piece = parsePiece(piece);

  PieceActionCreators.requestPiece(name, ['name']);
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
    requestData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (parseLogin(nextProps.params) !== parseLogin(this.props.params)) {
      requestData(nextProps);
    }
  }	
	render(){
    const piece = parsePiece(this.props);

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
