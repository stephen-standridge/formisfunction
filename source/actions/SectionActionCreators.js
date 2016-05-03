import { dispatchAsync } from '../AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import * as SectionAPI from '../api/SectionAPI';
import SectionStore from '../stores/SectionStore';

export function requestSection(section, fields) {
  // Exit early if we know enough about this section
  if (SectionStore.contains(section, fields)) {
    return;
  }
  dispatchAsync(SectionAPI.getSection(section), {
    request: ActionTypes.REQUEST_SECTION,
    success: ActionTypes.REQUEST_SECTION_SUCCESS,
    failure: ActionTypes.REQUEST_SECTION_ERROR
  }, { section });
}