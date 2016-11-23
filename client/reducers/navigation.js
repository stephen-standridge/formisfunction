import { fromJS } from 'immutable';
import { NAVIGATION_ACTIONS } from '../actions/action_types'

const initialState = fromJS({})

export default function update(state = initialState, action) {
	switch(action.type) {
		case NAVIGATION_ACTIONS.SUCCESS:
			state = fromJS(action.payload.navigation)
		break;
	}
  return state
}
