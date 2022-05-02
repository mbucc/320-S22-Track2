import {BPTestMeta} from './meta';

// Use this function to generate the path easily.
export const generatePath = (path, query) => {
  const queryEntires = [];
  Object.keys(query).forEach((key) => {
    const value = query[key].replaceAll(' ', '%20');
    queryEntires.push(`${key}=${value}`);
  });
  return `${BPTestMeta.rootUrl}${path}?${queryEntires.join('&')}`;
};
