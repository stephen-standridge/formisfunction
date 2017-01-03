import { CALL_API } from 'redux-api-middleware';
import { LINE_ACTIONS } from './action_types';
import { push } from 'react-router-redux';

export function changeView(direction){
	return function(dispatch, getState){
		const { line_navigation, lines } = getState()
		let selectedViewIndex = line_navigation.get('selectedViewIndex')
		let selectedLineIndex = line_navigation.get('selectedLineIndex')
		let maxViewIndex = line_navigation.get('maxViewIndex')
		let maxViewIndices = line_navigation.get('maxViewIndices').toJS()

		let max = selectedLineIndex ? maxViewIndices[selectedLineIndex] : maxViewIndex;
		let newIndex = (selectedViewIndex + direction) % max
		newIndex = newIndex < 0 ? max - 1 : newIndex;	
		let slug = lines.getIn([selectedLineIndex, 'views', newIndex, 'slug'])
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