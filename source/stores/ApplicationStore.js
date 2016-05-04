import { register } from '../AppDispatcher';
import { createStore, mergeIntoBag, isInBag } from '../utils/StoreUtils';
import selectn from 'selectn';

const _application = {
  _pieces: {},
  _navigation: {
    _visitedSections: {},
    _currentSection: '',
    _currentPiece: ''
  }
};

const ApplicationStore = createStore({
  contains(piece) {
    return isInBag(_application._pieces, piece);
  },
  hasVisited(section) {
    return isInBag(_application._navigation._visitedSections, section);
  },
  currentPiece() {
    return _application._navigation._currentPiece;
  },
  currentSection(){
    return _application._navigation._currentSection;
  },
  displayedPiece(){
    let piece = _application._navigation._currentPiece || 0;
    return _application._pieces[ piece ]
  }
});

ApplicationStore.dispatchToken = register(action => {
  const responsePieces = selectn('response.pieces', action);
  const responsePiece = selectn('response.selectedPiece', action);
  const responseSection = selectn('response.selectedSection', action);
  if ( responsePieces ) {
    mergeIntoBag(_application._pieces, responsePieces);
  }
  if( responsePiece ){
    _application._navigation._currentPiece = responsePiece;
  }
  if( responseSection ){
    mergeIntoBag( _application._navigation._visitedSections, responseSection )
    _application._navigation._currentSection = responseSection;
  }
  if( responsePieces || responsePiece || responseSection ){
    ApplicationStore.emitChange();
  }

});

export default ApplicationStore;