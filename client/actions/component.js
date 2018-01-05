import { COMPONENT_ACTIONS } from './action_types';
import { database } from '../stores/firebase';
import { fetchMedia, processMedia } from './media';
import { reportError } from './errors';
import assign from 'object-assign';

function create(slug, data) {
	const meta = { slug };
	return function(dispatch, getState) {
		dispatch({ type: COMPONENT_ACTIONS.CREATE, meta })

		database.ref('components').child(slug).set(data).once('value', new_component => {
			const component = new_component.val();
			payload = assign(payload, { component });
			dispatch({ type: COMPONENT_ACTIONS.SUCCESS, payload, meta });
		})
	};
};

function fetch(slug='index'){
	const meta = { slug };
	return function(dispatch, getState) {
		let payload = {
			component: {
				media: []
			}
		};

		dispatch({ type: COMPONENT_ACTIONS.REQUEST, meta })

		database.ref(`components/${slug}`).once('value', component_snap => {
			const val = component_snap.val();
			const promises = fetchAssociation(val, 'media');
			payload = assign(payload, { component: val });

			promises.length && Promise.all(promises).then((snaps) => {
				const vals = snaps.map((snap) => snap.val());
				payload.component = assign(payload.component, { media: vals });
				dispatch({ type: COMPONENT_ACTIONS.SUCCESS, payload, meta });

				const media_res = fetchMedia(vals);
				processMedia(media_res, dispatch);
			}).catch(reportError.bind(null, dispatch, meta));

		}).catch(reportError.bind(null, dispatch, meta))
	}
}

function fetchAssociation(val, association){
	return val[association] && Object.keys(val[association]).map((a) => {
		return database.ref(`${association}/${a}`).once('value')
	}) || []
}

function requested(slug){
	return { type: COMPONENT_ACTIONS.REQUESTED, meta: { slug } }
}

export { create, fetch, requested };
