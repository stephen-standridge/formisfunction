import { Schema, arrayOf, normalize } from 'normalizr';
import { camelizeKeys } from 'humps';
import 'core-js/es6/promise';
import 'whatwg-fetch';
export const assets = require.context("../../assets", true, /^\.\/.*\.js$/);


/**
 * Extracts the next page URL from Github API response.
 */
function getNextPageUrl(response) {
  const link = response.headers.get('link');
  if (!link) {
    return null;
  }

  const nextLink = link.split(',').filter(s => s.indexOf('rel="next"') > -1)[0];
  if (!nextLink) {
    return null;
  }

  return nextLink.split(';')[0].slice(1, -1);
}

// We use this Normalizr schemas to transform API responses from a nested form
// to a flat form where pieces and sections are placed in `entities`, and nested
// JSON objects are replaced with their IDs. This is very convenient for
// consumption by Stores, because each Store can just grab entities of its kind.

// Read more about Normalizr: https://github.com/gaearon/normalizr

const sectionSchema = new Schema('sections', { idAttribute: 'name' });
const pieceSchema = new Schema('pieces', { idAttribute: 'name' });
pieceSchema.define({
  owner: sectionSchema
});


const API_ROOT = './';

/**
 * Fetches an API response and normalizes the result JSON according to schema.
 */
// function fetchAndNormalize(url, schema) {
//   if (url.indexOf(API_ROOT) === -1) {
//     url = API_ROOT + url;
//   }
//   // return fetch(url).then(response =>{
//   //   return response.json().then(json => {
//       const camelizedJson = camelizeKeys(json);
//       const nextPageUrl = getNextPageUrl(response) || undefined;

//       return {
//         ...normalize(camelizedJson, schema),
//         nextPageUrl
//       };
//   //   })
//   // });
// } 
function fetchAndNormalize(url, schema) {
  if (url.indexOf(API_ROOT) === -1) {
    url = API_ROOT + url;
  }
  return new Promise(function(resolve, reject){
    let json = assets(url);

    const camelizedJson = camelizeKeys(json);

    // const nextPageUrl = getNextPageUrl(response) || undefined;
    resolve({
      ...normalize(camelizedJson, schema),
      // nextPageUrlz
    })
  })
}

export function fetchSection(url) {
  return fetchAndNormalize(url, sectionSchema);
}

export function fetchSectionArray(url) {
  return fetchAndNormalize(url, arrayOf(sectionSchema));
}

export function fetchPiece(url) {
  return fetchAndNormalize(url, pieceSchema);
}

export function fetchPieceArray(url) {
  return fetchAndNormalize(url, arrayOf(pieceSchema));
}
