/**
 * This function is to unwrap the data object into array structure.
 * Mainly used for the tree component.
 * @param {object} data - The data object to be unwrapped.
 * @return {array} - Unwrapped data.
 */
export function unwrapAPI(data) {
  const unwrappedData = [];
  // Given data is an object, we want to extract all keys and values.
  Object.keys(data).forEach((key) => {
    const value = data[key];
    const object = {
      name: key,
    };
    // If the value is an object, we want to recursively unwrap it.
    if (Array.isArray(value)) {
      object.activities = value;
    } else if (typeof value === 'object') {
      object.children = unwrapAPI(value);
    }
    unwrappedData.push(object);
  });
  return unwrappedData;
}
