/**
 * Resolves access path for given object
 * @param {string} path period delimited string represent access path
 * @param {*} obj Object to resolve path
 */
function resolve(path, obj) {
  return path.split('.').reduce(function(prev, curr) {
    return prev ? prev[curr] : null;
  }, obj || this);
}

export default resolve;
