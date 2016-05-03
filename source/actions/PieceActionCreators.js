import { dispatchAsync } from '../AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import * as PieceAPI from '../api/PieceAPI';
import PieceStore from '../stores/PieceStore';

export function requestPiece(piece, fields) {
  // Exit early if we know about this piece
  if (PieceStore.contains(piece, fields)) {
    return;
  }

  dispatchAsync(PieceAPI.getRepo(piece), {
    request: ActionTypes.REQUEST_PIECE,
    success: ActionTypes.REQUEST_PIECE_SUCCESS,
    failure: ActionTypes.REQUEST_PIECE_ERROR
  }, { piece });
}

