import { CALL_API } from 'redux-api-middleware';
import { COMPONENT_ACTIONS } from './action_types';

export function fetch(slug='site'){
	return {
	  [CALL_API]: {
	    endpoint: function(state){
	    	if(state.navigation) [CALL_API].bailout
	    	return `${process.env.API_HOST}/components/${slug}`
	    },
			headers: { 'Content-Type': 'application/json' },
	    method: 'GET',
	    types: [COMPONENT_ACTIONS.REQUEST, COMPONENT_ACTIONS.SUCCESS, COMPONENT_ACTIONS.FAILURE]
	  }
}
}