import { CALL_API } from 'redux-api-middleware';
import { LINE_ACTIONS } from './action_types';
import { push } from 'react-router-redux';

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

export function changeView(direction){
	return function(dispatch, getState){
		const { lines } = getState()
		let selectedViewIndex = lines.get('selectedViewIndex')
		let selectedLineIndex = lines.get('selectedLineIndex')
		let maxViewIndex = lines.get('maxViewIndex')
		let maxViewIndices = lines.get('maxViewIndices').toJS()

		let max = selectedLineIndex ? maxViewIndices[selectedLineIndex] : maxViewIndex;
		let newIndex = (selectedViewIndex + direction) % max
		newIndex = newIndex < 0 ? max - 1 : newIndex;	

		let slug = lines.getIn(['collection',selectedLineIndex, 'views', newIndex, 'slug'])
		if (slug) {
			dispatch(push(`/${slug}`))
		} else {
			dispatch({ type: LINE_ACTIONS.LINE_INDEX_CHANGE, index: newIndex })
		}

	}	
}

export function deselectView(){
	return { type: LINE_ACTIONS.DESELECT_LINE_AND_VIEW }
}