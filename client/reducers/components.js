import { fromJS } from 'immutable';
import { COMPONENT_ACTIONS } from '../actions/action_types'
import { uniq } from 'lodash';

const initialState = fromJS({})

export default function update(state = initialState, action) {
	const { type, meta, payload } = action;
	switch(type) {
		case COMPONENT_ACTIONS.SUCCESS:
			{
				const { component, components } = payload;
				const { slug } = meta;
				const { media } = component;
				delete component.media;
				component.media = [];
				let collections = [];
				media && media.forEach((m,i)=>{
					let collection = m.collection;
					if( collection ){
						component[collection] = component[collection] || [];
						component[collection].push(m);
						collections.push(collection);
					}
					component.media.push(m)
				})
				component.collections = uniq(collections);
				components && components.forEach((c) => {
					state = state.set(c.slug, fromJS(Object.assign(c, { needsLoad: true })))
				})
				state = state.set(slug, fromJS(component));
				break;
			}
		case COMPONENT_ACTIONS.REQUESTED:
			{
				const { slug } = meta;
				state = state.update(slug, (c=fromJS({}))=> c.merge(fromJS({ needsLoad: false })));
				break;
			}
		case COMPONENT_ACTIONS.FAILURE:
			{
				const { slug } = meta;
				state = state.update(slug, (c=fromJS({}))=> c.merge(fromJS({ needsLoad: true })));
				break;
			}
	}
  return state
}
