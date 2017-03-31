import { fromJS } from 'immutable';
import { COMPONENT_ACTIONS } from '../actions/action_types'

const initialState = fromJS({})

export default function update(state = initialState, action) {
	switch(action.type) {
		case COMPONENT_ACTIONS.SUCCESS:
			let component = action.payload.component;
			let components = action.payload.components || [];
			let media = component.media;

			delete component.media;
			media.forEach((m,i)=>{
				let collection = m.collection || 'media';
				component[collection] = component[collection] || [];
				component[collection].push(m);
			})
			components = components.concat(component);
			components.forEach((c) => {
				state = state.set(c.slug, fromJS(c))
			})
			break;
		// 		let maxViewIndices = [];
		// 		const component = action.payload.component;
		// 		const { lines, component_options } = component;
		// 		let maxViewIndex = lines.reduce((max, line, lineIndex)=>{
		// 			let length = line.views.length
		// 			maxViewIndices.push(length);
		// 			return max > length ? max : length;
		// 		}, 0)
		// 		state = state.set('selectedLineIndex', component_options && component_options.initial_line_selected ? component_options.initial_line_selected : false )
		// 		state = state.set('collection', fromJS(lines))
		// 		state = state.set('maxViewIndex', maxViewIndex)
		// 		state = state.set('maxViewIndices', fromJS(maxViewIndices))

		// case "@@router/LOCATION_CHANGE":
		// 	{
		// 		let pathname = action.payload.pathname.split('/');
		// 		pathname = pathname.length > 1 ? pathname[1] : pathname[0]
		// 		let selectedLineIndex = false;
		// 		let selectedViewIndex = state.get('selectedViewIndex');
		// 		state.get('collection').forEach((line, lineIndex)=>{
		// 			line.get('views').forEach((view, viewIndex)=>{
		// 				if(view.get('slug') == pathname){
		// 					selectedViewIndex = viewIndex
		// 					selectedLineIndex = lineIndex;
		// 				}
		// 			})
		// 		})
		// 		state = state.set('selectedLineIndex', selectedLineIndex)
		// 		state = state.set('selectedViewIndex', selectedViewIndex)
		// 	}
		// 	break;

		case COMPONENT_ACTIONS.LINE_INDEX_CHANGE:
			{
				let selectedViewIndex = action.index;
				let selectedLineIndex = state.get('selectedLineIndex');
				state = state.set('selectedViewIndex', selectedViewIndex)
			}
			break;

		case COMPONENT_ACTIONS.DESELECT_LINE_AND_VIEW:
			let selectedLineIndex = false;
			if (!isNaN(Number(selectedLineIndex))) {
				push('/')
			}
			break;
	}
  return state
}
