import { fromJS } from 'immutable';
import { LINE_ACTIONS } from '../actions/action_types'

const initialState = fromJS({})

export default function update(state = initialState, action) {
	switch(action.type) {
		case LINE_ACTIONS.SUCCESS:
			state = fromJS(action.payload.lines)
		break;
	}
  return state
}
