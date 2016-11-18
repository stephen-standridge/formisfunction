import { CALL_API } from 'redux-api-middleware';
import { LINE_ACTIONS } from './action_types';

export function fetch(){
	return {
	  [CALL_API]: {
	    endpoint: function(state){
	    	if(state.lines.length) [CALL_API].bailout
	    	return `${process.env.API_HOST}/lines`
	    },
			headers: { 'Content-Type': 'application/json' },
	    method: 'GET',
	    types: [LINE_ACTIONS.REQUEST, LINE_ACTIONS.SUCCESS, LINE_ACTIONS.FAILURE]
	  }
}
}