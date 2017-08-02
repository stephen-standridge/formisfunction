import { SUBSCRIPTION_ACTIONS } from './action_types';
import { database } from '../stores/firebase';

export function subscribe(email) {
  return function(dispatch) {
    dispatch({ type: SUBSCRIPTION_ACTIONS.REQUESTED })
    const safeEmail = encodeURIComponent(email).replace('.', '%2E');
    database.ref(`subscriptions/${safeEmail}`).set(true).then(function(error){
      if(error) {
        dispatch({ type: SUBSCRIPTION_ACTIONS.FAILURE, error });
      } else {
        dispatch({ type: SUBSCRIPTION_ACTIONS.SUCCESS })
      }
    }).catch(function(error){
      dispatch({ type: SUBSCRIPTION_ACTIONS.FAILURE, error })
    })
  }
}
