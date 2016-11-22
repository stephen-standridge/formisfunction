import { CALL_API } from 'redux-api-middleware';
import { NAVIGATION_ACTIONS } from './action_types';

export function fetch(){
	return {
	  [CALL_API]: {
	    endpoint: function(state){
	    	if(state.navigation) [CALL_API].bailout
	    	return `${process.env.API_HOST}/navigation`
	    },
			headers: { 'Content-Type': 'application/json' },
	    method: 'GET',
	    types: [NAVIGATION_ACTIONS.REQUEST, NAVIGATION_ACTIONS.SUCCESS, NAVIGATION_ACTIONS.FAILURE]
	  }
}
}