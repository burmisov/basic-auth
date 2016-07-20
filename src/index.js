const bindAuthentification = require('./lib/bindAuthentification').default;
const createAuthentificationMiddlewares =
  require('./lib/createAuthentificationMiddlewares').default;
const createRouterMiddlewares = require('./lib/createRouterMiddlewares').default;
const checkAccess = require('./lib/checkAccess').default;
const calcMd5 = require('./lib/calcMd5').default;
const authentificationActions = require('./redux/actions').default;
const authentificationReducer = require('./redux').default;

module.exports = {
  bindAuthentification,
  createAuthentificationMiddlewares,
  createRouterMiddlewares,
  checkAccess,
  calcMd5,
  authentificationActions,
  authentificationReducer,
};
