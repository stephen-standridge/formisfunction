import React from 'react';
import connectToStores from '../utils/connectToStores';

function parsePiece(params) {
  return params.piece;
}

function requestData(props) {
  const { params } = props;
  const section = parsePiece(section);

  // UserActionCreators.requestUser(userLogin, ['name', 'avatarUrl']);
}

// connectToStores([StarredReposByUserStore, UserStore, RepoStore], getState)
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

		return <div></div>
	}
}

Piece.propTypes = {
  // Injected by React Router:
  params: React.PropTypes.shape({
    section: React.PropTypes.string.isRequired,
    piece: React.PropTypes.string.isRequired
  }).isRequired,
  // Injected by connectToStores:
  // piece: React.PropTypes.object,
};

export default Piece
