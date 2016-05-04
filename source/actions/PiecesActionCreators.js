import { dispatchAsync } from '../AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import * as PiecesAPI from '../api/PiecesAPI';
import ApplicationStore from '../stores/ApplicationStore';

export function requestPiecesOrPiece(endpoint) {
  // Exit early if we know enough about this endpoint
  if ( ApplicationStore.contains(endpoint) || ApplicationStore.hasVisited(endpoint) ) {
    return;
  }
  dispatchAsync(PiecesAPI.getPiecesAndPiece(endpoint), {
    request: ActionTypes.REQUEST_PIECES,
    success: ActionTypes.REQUEST_PIECES_SUCCESS,
    failure: ActionTypes.REQUEST_PIECES_ERROR
  }, { endpoint });
}

export function requestPiece( name ){

}