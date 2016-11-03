import { CALL_API } from 'redux-api-middleware';
import { VIEW_ACTIONS } from './action_types';

export function get(slug='index'){
	return {
	  [CALL_API]: {
	    endpoint: function(state){
	    	if(state.views.get(slug)) [CALL_API].bailout
	    	return `${process.env.API_HOST}/views/${slug}`
	    },
			headers: { 'Content-Type': 'application/json' },
	    method: 'GET',
	    types: [VIEW_ACTIONS.REQUEST, VIEW_ACTIONS.SUCCESS, VIEW_ACTIONS.FAILURE]
	  }
	}
}