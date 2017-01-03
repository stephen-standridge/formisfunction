import { CALL_API } from 'redux-api-middleware';
import { VIEW_ACTIONS } from './action_types';

export function get(id){
	return {
	  [CALL_API]: {
	    endpoint: `${process.env.API_HOST}/views/${id}`,
			headers: { 'Content-Type': 'application/json' },
	    method: 'GET',
	    types: [VIEW_ACTIONS.REQUEST, VIEW_ACTIONS.SUCCESS, VIEW_ACTIONS.FAILURE]
	  }
	}
}