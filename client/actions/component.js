import { CALL_API } from 'redux-api-middleware';
import { COMPONENT_ACTIONS } from './action_types';
import { push } from 'react-router-redux';

export function fetch(slug='index'){
	return {
	  [CALL_API]: {
	    endpoint: function(state){
	    	if(state.navigation) [CALL_API].bailout
	    	return `${process.env.API_HOST}/component?slug=${slug}`
	    },
			headers: { 'Content-Type': 'application/json' },
	    method: 'GET',
	    types: [{ type: COMPONENT_ACTIONS.REQUEST, meta: { slug }},
	    				{ type: COMPONENT_ACTIONS.SUCCESS, meta: { slug }},
	    				{ type: COMPONENT_ACTIONS.FAILURE, meta: { slug }}]
	  }
	}
}

export function requested(slug){
	return { type: COMPONENT_ACTIONS.REQUESTED, meta: { slug } }
}
