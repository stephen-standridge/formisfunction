import { fromJS } from 'immutable';
import { COMPONENT_ACTIONS } from '../actions/action_types'
import { uniq, orderBy } from 'lodash';

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
				component.states = [];
				let collections = [];

				console.warn(media)
				media && media.forEach((m,i)=>{
					if(!m) return;
					const { collection, state } = m;
					if (collection) {
						component[collection] = component[collection] || [];
						component[collection].push(m);
						if (!isNaN(Number(m.order))) component[collection] = orderBy(component[collection], 'order')
						collections.push(collection);
					}
					if (state) {
						component.states.push(state);
					}
					component.media.push(m)
				})
				component.collections = uniq(collections);
				components && components.forEach((c) => {
					state = state.set(c.slug, fromJS(Object.assign(c, { loading: false, needsLoad: true, error: false })))
				})
				state = state.set(slug, fromJS(component));
				break;
			}
		case COMPONENT_ACTIONS.REQUEST:
			{
				const { slug } = meta;
				state = state.update(slug, (c=fromJS({}))=> c.merge(fromJS({ loading: true, needsLoad: false })));
				break;
			}
		case COMPONENT_ACTIONS.FAILURE:
			{
				const { slug } = meta;
				const { error } = payload;
				state = state.update(slug, (c=fromJS({}))=> c.merge(fromJS({ loading: false, needsLoad: true, error })));
				break;
			}
		case COMPONENT_ACTIONS.CREATE:
			{
			}
	}
  return state
}
