import { fetchSection, fetchSectionArray } from '../utils/APIUtils';

export function getSection(section, url = `sections/${section}.json`) {
  return fetchSection(url);
}
