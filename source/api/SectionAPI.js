import { fetchSection, fetchSectionArray } from '../utils/APIUtils';

export function getSection(section, url = `sections/${section}.js`) {
  return fetchSection(url);
}
