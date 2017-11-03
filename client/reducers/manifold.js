import { fromJS } from 'immutable';
import { MANIFOLD_ACTIONS } from '../actions/action_types'

const initialState = fromJS({
})

export default function update(state = initialState, action) {
  const { slug, payload, error } = action;
  switch(action.type) {
    case MANIFOLD_ACTIONS.VERSIONS_REQUESTED:
      state = state.setIn([slug, 'updating'], true)
      state = state.setIn([slug, 'error'], false)
    break;
    case MANIFOLD_ACTIONS.VERSIONS_SUCCESS:
      state = state.setIn([slug, 'updating'], false)
      state = state.setIn([slug, 'program_versions'], payload.versions)
      state = state.setIn([slug, 'version_count'], payload.versions && payload.versions.length)
      state = state.setIn([slug, 'current_version'], payload.versions && payload.versions.length - 1 || 0)
      state = state.setIn([slug, 'error'], false)
    break;
    case MANIFOLD_ACTIONS.VERSIONS_FAILURE:
      state = state.setIn([slug, 'updating'], false)
      state = state.setIn([slug, 'error'], error);
    break;
  }
  return state
}
