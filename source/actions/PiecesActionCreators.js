import { dispatch } from '../AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import * as PiecesAPI from '../api/PiecesAPI';
import PieceStore from '../stores/PieceStore';

export function requestPiecesOrPiece(endpoint, fields) {
  // Exit early if we know enough about this endpoint
  if (PieceStore.contains(endpoint, fields)) {
    return;
  }
  dispatch(PiecesAPI.getPiecesAndPiece(endpoint), {
    request: ActionTypes.REQUEST_SECTION,
    success: ActionTypes.REQUEST_SECTION_SUCCESS,
    failure: ActionTypes.REQUEST_SECTION_ERROR
  }, { endpoint });
}