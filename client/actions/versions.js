import { VERSIONS_ACTIONS } from './action_types';
import { database } from '../stores/firebase';

const version_types = {
  'article': 'article_versions',
  'articles': 'article_versions'
};

function fetchVersions(data_vals) {
  return data_vals.reduce((sum, d_val) => {
    let data_type = version_types[d_val.type];
    if(data_type && d_val[data_type]) {
      Object.keys(d_val[data_type]).forEach((key) => {
        sum[0].push(database.ref(`${data_type}/${key}`).once('value'));
        sum[1].push(data_type);
        sum[2].push(key);
      })
    }
    return sum;
  }, [[], [], []]);
}

function processVersions(version_res, dispatch) {
  const payload = {
    article_versions : {}
  };

  const [promises, types, slugs ] = version_res;

  const meta = { slugs, types }

  dispatch({ type: VERSIONS_ACTIONS.REQUEST, meta });

  promises.length && Promise.all(promises).then(function(snaps) {
    const val = snaps.map((snap) => [snap.key, snap.val()]);

    types.forEach((type, index) => {
      payload[type][val[index][0]] = val[index][1];
    });

    dispatch({ type: VERSIONS_ACTIONS.SUCCESS, payload, meta });
  }).catch(reportError.bind(null, dispatch, meta));
}

export function reportError(dispatch, meta, error) {
  console.error(error);
  const payload = { error };
  dispatch({ type: VERSION_ACTIONS.FAILURE, payload, meta });
}

export { fetchVersions, processVersions };
