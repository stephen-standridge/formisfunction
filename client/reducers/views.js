import { fromJS } from 'immutable';
import { VIEW_ACTIONS } from '../actions/action_types'

const initialState = fromJS({})

export default function update(state = initialState, action) {
	switch(action.type) {
		case VIEW_ACTIONS.SUCCESS:
			action.payload.views.forEach((view)=>{
				state = state.set(view.slug, view)
			})
		break;
	}
  return state
}
