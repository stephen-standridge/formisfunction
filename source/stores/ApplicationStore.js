import { register } from '../AppDispatcher';
import { createStore, mergeIntoBag, isInBag } from '../utils/StoreUtils';
import selectn from 'selectn';
import defaultPieces from '../constants/defaultPieces';

const _application = {
  _pieces: {},
  _navigation: {
    _visitedSections: {},
    _currentSection: 'welcome',
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
    let piece = _application._navigation._currentPiece || defaultPieces.get(_application._navigation._currentSection);
    return _application._pieces[ piece ]
  }
});

ApplicationStore.dispatchToken = register(action => {
  const responsePieces = selectn('response.pieces', action);
  const responsePiece = selectn('response.selectedPiece', action);
  const responseSection = selectn('response.selectedSection', action);
  if ( responsePieces !== undefined ) {
    mergeIntoBag(_application._pieces, responsePieces);
  }
  if( responsePiece !== undefined ){
    _application._navigation._currentPiece = responsePiece;
  }
  if( responseSection !== undefined ){
    mergeIntoBag( _application._navigation._visitedSections, responseSection )
    _application._navigation._currentSection = responseSection;
  }
  if( responsePieces !== undefined || responsePiece !== undefined || responseSection !== undefined ){
    ApplicationStore.emitChange();
  }

});

export default ApplicationStore;
