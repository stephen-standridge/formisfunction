import { fromJS } from 'immutable';
import { GET_POSTS_SUCCESS, HIDE_POST } from '../actions/action_types'

const initialState = fromJS({
  data: []
})

export default function update(state = initialState, action) {  
  switch( action.type ){
    case GET_POSTS_SUCCESS:
      state = state.set('data', fromJS(action.data))
      break;
    case HIDE_POST:
      state = state.setIn(['data', action.index, 'hidden'], true)
  }
  return state
}
