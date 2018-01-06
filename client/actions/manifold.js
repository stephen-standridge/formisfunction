import { MANIFOLD_ACTIONS } from './action_types';
import { database } from '../stores/firebase';
import  request from 'browser-request';

export function version_url(manifold) {
  const { urlPrefix, slug } = manifold;
  return `${urlPrefix && urlPrefix.length ? urlPrefix : process.env.MANIFOLD_HOST}manifold/${slug}/versions.json`;
}
export function configuration_url(slug, version){
  const { urlPrefix, version_id } = version;
  return `${urlPrefix && urlPrefix.length ? urlPrefix : process.env.MANIFOLD_HOST}manifold/${slug}/${version_id}/configuration.js`;
}
export function file_url(slug, version, url){
  const { urlPrefix, version_id } = version;
  const host = `${urlPrefix && urlPrefix.length ? urlPrefix : process.env.MANIFOLD_HOST}manifold/${slug}/${version_id}/assets/`;
  return host + url
}

export function get_versions(manifold) {
  return function(dispatch) {
    const {slug} = manifold;
    const options = { method:'GET', uri:version_url(manifold), body:'{"relaxed":true}', json:true };
    dispatch({ type: MANIFOLD_ACTIONS.VERSIONS_REQUESTED, slug })
    request(options, function(error, res, payload) {
      if(error) {
        dispatch({ type: MANIFOLD_ACTIONS.VERSIONS_FAILURE, slug, error });
      } else {
        dispatch({ type: MANIFOLD_ACTIONS.VERSIONS_SUCCESS, slug, payload })
      }
    })
  }
}

export function get_configuration(manifold, version) {
  return function(dispatch) {
    const { version_id } = version;
    const { slug } = manifold;
    const options = { method:'GET', uri:configuration_url(slug, version), body:'{"relaxed":true}' };
    dispatch({ type: MANIFOLD_ACTIONS.CONFIGURATION_REQUESTED, slug, version })
    request(options, function(error, res, payload) {
      if(error) {
        dispatch({ type: MANIFOLD_ACTIONS.CONFIGURATION_FAILURE, slug, version_id, error });
      } else {
        dispatch({ type: MANIFOLD_ACTIONS.CONFIGURATION_SUCCESS, slug, version_id, payload })
      }
    })
  }
}
