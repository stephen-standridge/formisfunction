import { fromJS } from 'immutable';
import { COMPONENT_ACTIONS } from '../actions/action_types'

const initialState = fromJS({})

export default function update(state = initialState, action) {
	const { type, meta, payload } = action;
	switch(type) {
		case COMPONENT_ACTIONS.SUCCESS:
			{
				const { component, components } = payload;
				const { slug } = meta;
				const { media } = component;

				component.media = [];
				media && media.forEach((m,i)=>{
					let collection = m.collection || 'media';
					component[collection] = component[collection] || [];
					component[collection].push(m);
					component.media.push(m)
				})
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
