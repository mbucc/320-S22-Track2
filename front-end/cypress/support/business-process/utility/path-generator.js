import {BPTestMeta} from './meta';

// Use this function to generate the path easily.
export const generatePath = (path, query = {}) => {
  const queryEntires = [];
  Object.keys(query).forEach((key) => {
    let value = query[key];
    if (value === undefined) {
      return;
    }
    if (Array.isArray(value)) {
      value = value.join(',');
    }
    if (typeof value === 'string') {
      value = value.replaceAll(' ', '%20');
    }
    queryEntires.push(`${key}=${value}`);
  });
  return `${BPTestMeta.rootUrl}${path}?${queryEntires.join('&')}`;
};
