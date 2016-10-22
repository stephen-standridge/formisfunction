import { Map } from 'immutable';
import { INCREASE, DECREASE } from '../actions/action_types'

const initialState = Map({
  number: 1
})

export default function update(state = initialState, action) {
  switch( action.type ){
    case INCREASE:
      state = state.update('number', (n)=> n+= action.amount )
      break;
    case DECREASE:
      state = state.update('number', (n)=> n-= action.amount )
      break;
  }
  return state
}
