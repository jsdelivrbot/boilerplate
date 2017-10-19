const _ = require('lodash');
const env = require('../../env.json');

// prepare the object keys -> append process.env
const keys = _.mapKeys(env, (val, key) => {
  return `process.env.${key}`;
});
// stringify values
const ENV = _.mapValues(keys, (val, key) => {
  return JSON.stringify(val);
});

module.exports = ENV;
