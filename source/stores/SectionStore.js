import { register } from '../AppDispatcher';
import { createStore, mergeIntoBag, isInBag } from '../utils/StoreUtils';
import selectn from 'selectn';

const _sections = {};

const SectionStore = createStore({
  contains(login, fields) {
    return isInBag(_sections, login, fields);
  },

  get(login) {
    return _sections[login];
  }
});

SectionStore.dispatchToken = register(action => {
  const responseSections = selectn('response.entities.sections', action);
  if (responseSections) {
    mergeIntoBag(_sections, responseSections);
    SectionStore.emitChange();
  }
});

export default SectionStore;
