//------------------------------------------------------------------------------
// helpers.js
//------------------------------------------------------------------------------

const urlQuery = (obj) => {
  const pairs = [];
  for (const prop in obj) {
    pairs.push(`${prop}=${obj[prop]}`);
  }
  return pairs.length === 0 ? '' : `?${pairs.join('&')}`;
};
