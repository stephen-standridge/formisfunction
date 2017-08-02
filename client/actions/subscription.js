import { SUBSCRIPTION_ACTIONS } from './action_types';
import { database } from '../stores/firebase';

export function subscribe(email) {
  return function(dispatch) {
    dispatch({ type: SUBSCRIPTION_ACTIONS.REQUESTED })
    const safeEmail = encodeURIComponent(email).replace('.', '%2E');
    database.ref(`subscriptions/${safeEmail}`).once('value').then(function(snap){
      if(snap.val()){
        dispatch({ type: SUBSCRIPTION_ACTIONS.SUCCESS })
      } else {
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
    }).catch(function(error){
      dispatch({ type: SUBSCRIPTION_ACTIONS.FAILURE, error })
    })
  }
}
