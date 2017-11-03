import { COMPONENT_ACTIONS } from './action_types';
import { push } from 'react-router-redux';
import { database } from '../stores/firebase';
import assign from 'object-assign';

const media_types = {
	'article' : 'articles',
	'articles' : 'articles',
	'program': 'programs',
	'programs': 'programs',
	'link': 'links',
	'links': 'links',
	'component': 'components',
	'components': 'components',
	'media': 'media'
};
const version_types = {
	'article': 'article_versions',
	'articles': 'article_versions',
	// 'program': 'program_versions',
	// 'programs': 'program_versions'
}

export function fetch(slug='index'){
	const meta = { slug };
	return function(dispatch, getState) {
		const boundReportError = reportError.bind(this, dispatch, meta);
		let payload = {
			component: null,
			articles: [],
			programs: [],
			links: [],
			components: [],
			article_versions: {},
			// program_versions: {}
		};
		dispatch({ type: COMPONENT_ACTIONS.REQUEST, meta })

		database.ref(`components/${slug}`).once('value', component_snap => {
			const component_val = component_snap.val();
			const media_promises = fetchAssociation(component_val, 'media');
			payload = assign(payload, { component: component_val });

			media_promises.length && Promise.all(media_promises).then((media_snaps) => {
				const media_vals = media_snaps.map((m_snap) => m_snap.val());
				payload.component = assign(payload.component, { media: media_vals });
				const [m_o_t_promises, m_o_t_types] = fetchMedia(media_vals);
				m_o_t_promises.length && Promise.all(m_o_t_promises).then((media_of_type_snaps) => {
					const media_of_type_vals = media_of_type_snaps.map((m_o_t_snap) => m_o_t_snap.val());
					m_o_t_types.forEach((type, index) => {
						payload[type].push(media_of_type_vals[index]);
					})
					const [version_promises, version_types] = fetchVersions(media_of_type_vals);
					version_promises.length && Promise.all(version_promises).then((version_snaps) => {
						const version_vals = version_snaps.map((v_snap) => [v_snap.key, v_snap.val()]);
						version_types.forEach((type, index) => {
							payload[type][version_vals[index][0]] = version_vals[index][1];
						})
						dispatch({ type: COMPONENT_ACTIONS.SUCCESS, payload, meta });
					}).catch(boundReportError) || dispatch({ type: COMPONENT_ACTIONS.SUCCESS, payload, meta })
				}).catch(boundReportError) || dispatch({ type: COMPONENT_ACTIONS.SUCCESS, payload, meta });
			}).catch(boundReportError) || dispatch({ type: COMPONENT_ACTIONS.SUCCESS, payload, meta });
		}).catch(boundReportError)
	}
}

function fetchMedia(media_vals){
	return media_vals.reduce((sum, m_val) => {
		let data_type = media_types[m_val.type];
		sum[0].push(database.ref(`${data_type}/${m_val.slug}`).once('value'));
		sum[1].push(data_type)
		return sum
	}, [[], []])
}

function fetchVersions(data_vals) {
	return data_vals.reduce((sum, d_val) => {
		let data_type = version_types[d_val.type];
		if(data_type && d_val[data_type]) {
			Object.keys(d_val[data_type]).forEach((key) => {
				sum[0].push(database.ref(`${data_type}/${key}`).once('value'));
				sum[1].push(data_type)
			})
		}
		return sum
	}, [[], []])
}

function fetchAssociation(component_val, association){
	return component_val[association] && Object.keys(component_val[association]).map((a) => {
		return database.ref(`${association}/${a}`).once('value')
	}) || []
}

function reportError(dispatch, meta, error) {
	console.error(error);
	const payload = { error };
	dispatch({ type: COMPONENT_ACTIONS.FAILURE, payload, meta });
}

export function requested(slug){
	return { type: COMPONENT_ACTIONS.REQUESTED, meta: { slug } }
}
