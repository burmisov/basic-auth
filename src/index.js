const bindAuthentification = require('./lib/bindAuthentification').default;
const createAuthentification = require('./lib/createAuthentification').default;
const checkAccess = require('./lib/checkAccess').default;
const calcMd5 = require('./lib/calcMd5').default;
const authentificationActions = require('./redux/actions').default;
const authentificationReducer = require('./redux').default;

module.exports = {
  bindAuthentification,
  createAuthentification,
  checkAccess,
  calcMd5,
  authentificationActions,
  authentificationReducer,
};
