const bindAuthentification = require('./lib/bindAuthentification').default;
const cookiesSession = require('./lib/cookiesSession').default;
const routes = require('./lib/routes').default;
const checkAccess = require('./lib/checkAccess').default;
const calcMd5 = require('./lib/calcMd5').default;
const getActions = require('./redux/actions').default;
const reducers = require('./redux').default;

module.exports = {
  bindAuthentification,
  cookiesSession,
  routes,
  checkAccess,
  calcMd5,
  getActions,
  reducers,
};
