import { fromJS } from 'immutable';
import { LINE_ACTIONS, SITE_ACTIONS } from '../actions/action_types'
import { push } from 'react-router-redux';


const initialState = fromJS({ collection: [], selectedLineIndex: false, selectedViewIndex: 0 })

export default function update(state = initialState, action) {
	switch(action.type) {
		case SITE_ACTIONS.SUCCESS:
			state = fromJS(action.payload.site.lines)
		break;
	}
  return state
}
