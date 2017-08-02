import { fromJS } from 'immutable';
import { SUBSCRIPTION_ACTIONS } from '../actions/action_types'

const initialState = fromJS({ subscribed: false, subscribing: false, error_count: 0 });
const err_messages = ["oops!", "my bad...", "try again?", "maybe next time...", "this really isn't working."];
const final_message = "someone has been informed.";

export default function update(state = initialState, action) {
  switch(action.type) {
    case SUBSCRIPTION_ACTIONS.REQUESTED:
      state = state.set('subscribing', true)
      state = state.set('error', false)
    break;
    case SUBSCRIPTION_ACTIONS.SUCCESS:
      state = state.set('subscribed', true)
      state = state.set('subscribing', false)
      state = state.set('error', false)
    break;
    case SUBSCRIPTION_ACTIONS.FAILURE:
      state = state.set('subscribed', false)
      state = state.set('subscribing', false)
      state = state.set('error', state.get('error_count') < err.length ? err_messages[state.get('error_count')] : final_message);
      state = state.update('error_count', (c) => c+1);
    break;
  }
  return state
}
