import { CALL_API } from 'redux-api-middleware';
import { SITE_ACTIONS } from './action_types';

export function fetch(){
	return {
	  [CALL_API]: {
	    endpoint: function(state){
	    	if(state.navigation) [CALL_API].bailout
	    	return `${process.env.API_HOST}/sites`
	    },
			headers: { 'Content-Type': 'application/json' },
	    method: 'GET',
	    types: [SITE_ACTIONS.REQUEST, SITE_ACTIONS.SUCCESS, SITE_ACTIONS.FAILURE]
	  }
}
}