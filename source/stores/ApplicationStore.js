import { register } from '../AppDispatcher';
import { createStore, mergeIntoBag, isInBag } from '../utils/StoreUtils';
import selectn from 'selectn';
import defaultPieces from '../constants/defaultPieces';
import {map, filter} from 'underscore'

const _application = {
  _pieces: {},
  _navigation: {
    _currentSection: 'welcome',
    _currentPiece: ''
  }
};

const ApplicationStore = createStore({
  hasVisited(section) {
    return _application._pieces[section] ? true : false
  },
  currentPiece() {
    return _application._navigation._currentPiece;
  },
  currentSection(){
    return _application._navigation._currentSection;
  },
  displayedPiece(){
    let piece = _application._navigation._currentPiece || defaultPieces.get(_application._navigation._currentSection);
    if(_application._pieces[_application._navigation._currentSection]){
      return _application._pieces[_application._navigation._currentSection][ piece ]      
    }
  },
  linearNavigation(){
    // filter(_application._navigation._currentSection
    // this.displayedPieceName();
  }
});

ApplicationStore.dispatchToken = register(action => {
  const responsePieces = selectn('response.pieces', action);
  const responsePiece = selectn('response.selectedPiece', action);
  const responseSection = selectn('response.selectedSection', action);
  _application._navigation._currentSection = responseSection;
  if ( responsePieces !== undefined ) {
    _application._pieces[responseSection] = _application._pieces[responseSection] || {}
    mergeIntoBag(_application._pieces[responseSection], responsePieces);
  }
  if( responsePiece !== undefined ){
    _application._navigation._currentPiece = responsePiece;
  }
  if( responsePieces !== undefined || responsePiece !== undefined || responseSection !== undefined ){
    ApplicationStore.emitChange();
  }

});

export default ApplicationStore;
