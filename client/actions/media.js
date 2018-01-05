import { MEDIA_ACTIONS } from './action_types';
import { database } from '../stores/firebase';
import { fetchVersions, processVersions } from './versions';

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

function fetchMedia(media_vals){
  return media_vals.reduce((sum, m_val) => {

    let data_type = media_types[m_val.type];
    sum[0].push(database.ref(`${data_type}/${m_val.slug}`).once('value'));
    sum[1].push(data_type)
    sum[2].push(m_val.slug)
    return sum
  }, [[], [], []])
}

function processMedia(media_res, dispatch) {
  const payload = {
    articles: [],
    programs: [],
    links: [],
    components: []
  };

  const [promises, types, slugs] = media_res;
  const meta = { types, slugs };

  dispatch({ type: MEDIA_ACTIONS.REQUEST, meta });

  promises.length && Promise.all(promises).then((snaps) => {
    const vals = snaps.map((m_o_t_snap) => m_o_t_snap.val());

    types.forEach((type, index) => {
      payload[type].push(vals[index]);
    });

    dispatch({ type: MEDIA_ACTIONS.SUCCESS, payload});

    const version_res = fetchVersions(vals);
    processVersions(version_res, dispatch);
  }).catch(reportError.bind(null, dispatch, meta));
}

export function reportError(dispatch, meta, error) {
  console.error(error);
  const payload = { error };
  dispatch({ type: MEDIA_ACTIONS.FAILURE, payload, meta });
}


export { fetchMedia, processMedia };
