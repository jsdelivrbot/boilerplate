const _ = require('lodash');
const env = require('../../env.json');

// get curent node environment
env.NODE_ENV = process.env.NODE_ENV || 'development';
// prepare the object keys -> append process.env
const keys = _.mapKeys(env, (val, key) => {
  return `process.env.${key}`;
});
// stringify values
const ENV = _.mapValues(keys, (val, key) => {
  return JSON.stringify(val);
});

module.exports = ENV;
