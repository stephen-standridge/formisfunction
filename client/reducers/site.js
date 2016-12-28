import { fromJS } from 'immutable';
import { SITE_ACTIONS } from '../actions/action_types'

const initialState = fromJS({})

export default function update(state = initialState, action) {
	switch(action.type) {
		case SITE_ACTIONS.SUCCESS:
			state.set('navigation', fromJS(action.payload.site.navigation))
			state.set('lines', fromJS(action.payload.site.lines))
		break;
	}
  return state
}
