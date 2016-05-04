import { register } from '../AppDispatcher';
import { createStore, mergeIntoBag, isInBag } from '../utils/StoreUtils';
import selectn from 'selectn';

const _pieces = {};

const PieceStore = createStore({
  contains(fullName, fields) {
    return isInBag(_pieces, fullName, fields);
  },

  get(fullName) {
    return _pieces[fullName];
  }
});

PieceStore.dispatchToken = register(action => {
  const responsePieces = selectn('response.entities.pieces', action);
  console.log(action)
  if (responsePieces) {
    mergeIntoBag(_pieces, responsePieces);
    PieceStore.emitChange();
  }
});

export default PieceStore;
