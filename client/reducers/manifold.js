import { fromJS } from 'immutable';
import { MANIFOLD_ACTIONS } from '../actions/action_types'

const initialState = fromJS({
})

export default function update(state = initialState, action) {
  const { slug, version_id, payload, error } = action;
  switch(action.type) {
    case MANIFOLD_ACTIONS.VERSIONS_REQUESTED:
      state = state.setIn([slug, 'loading'], true)
      state = state.setIn([slug, 'error'], false)
    break;
    case MANIFOLD_ACTIONS.VERSIONS_SUCCESS:
      state = state.setIn([slug, 'loading'], false)
      state = state.setIn([slug, 'program_versions'], payload.versions)
      state = state.setIn([slug, 'version_count'], payload.versions && payload.versions.length)
      state = state.setIn([slug, 'current_version'], payload.versions && payload.versions.length - 1 || 0)
      state = state.setIn([slug, 'error'], false)
    break;
    case MANIFOLD_ACTIONS.VERSIONS_FAILURE:
      state = state.setIn([slug, 'loading'], false);
      state = state.setIn([slug, 'error'], error);
    break;
    case MANIFOLD_ACTIONS.CONFIGURATION_REQUESTED:
      state = state.setIn(['configurations', slug, version_id, 'loading'], true);
      state = state.setIn(['configurations', slug, version_id, 'loaded'], false);
      state = state.setIn(['configurations', slug, version_id, 'error'], false);
    break;
    case MANIFOLD_ACTIONS.CONFIGURATION_SUCCESS:
      state = state.setIn(['configurations', slug, version_id, 'loading'], false);
      state = state.setIn(['configurations', slug, version_id, 'loaded'], true);
      state = state.setIn(['configurations', slug, version_id, 'error'], false);
      state = state.setIn(['configurations', slug, version_id, 'script'], payload);
    break;
    case MANIFOLD_ACTIONS.CONFIGURATION_FAILURE:
      state = state.setIn(['configurations', slug, version_id, 'loading'], false);
      state = state.setIn(['configurations', slug, version_id, 'loaded'], false);
      state = state.setIn(['configurations', slug, version_id, 'error'], error);
    break;
  }
  return state
}
