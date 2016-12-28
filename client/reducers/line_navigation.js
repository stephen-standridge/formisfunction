import { fromJS } from 'immutable';
import { LINE_ACTIONS, SITE_ACTIONS } from '../actions/action_types'
import { push } from 'react-router-redux';


const initialState = fromJS({ collection: [], selectedLineIndex: false, selectedViewIndex: 0 })

export default function update(state = initialState, action) {
	switch(action.type) {	
		case SITE_ACTIONS.SUCCESS:
			{
				let maxViewIndices = [];
				let lines = action.payload.site.lines;
				let maxViewIndex = lines.reduce((max, line, lineIndex)=>{
					let length = line.views.length
					maxViewIndices.push(length);
					return max > length ? max : length;
				}, 0)
				state = state.set('collection', fromJS(lines))
				state = state.set('maxViewIndex', maxViewIndex)
				state = state.set('maxViewIndices', fromJS(maxViewIndices))
			}
			break;

		case "@@router/LOCATION_CHANGE":
			{
				let pathname = action.payload.pathname.split('/');
				pathname = pathname.length > 1 ? pathname[1] : pathname[0]
				let selectedLineIndex = false;
				let selectedViewIndex = state.get('selectedViewIndex');
				state.get('collection').forEach((line, lineIndex)=>{
					line.get('views').forEach((view, viewIndex)=>{
						if(view.get('slug') == pathname){ 
							selectedViewIndex = viewIndex 
							selectedLineIndex = lineIndex;
						}
					})
				})
				state = state.set('selectedLineIndex', selectedLineIndex)
				state = state.set('selectedViewIndex', selectedViewIndex)
			}
			break;
		case LINE_ACTIONS.LINE_INDEX_CHANGE:
			{
				let selectedViewIndex = action.index;
				let selectedLineIndex = state.get('selectedLineIndex');
				state = state.set('selectedViewIndex', selectedViewIndex)
			}
			break;
		case LINE_ACTIONS.DESELECT_LINE_AND_VIEW:
			let selectedLineIndex = false;
			if (!isNaN(Number(selectedLineIndex))) {
				push('/')
			}
			break;			
	}
  return state
}
