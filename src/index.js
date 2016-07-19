import createAuthentification from './lib/createAuthentification';
import checkAccess from './lib/checkAccess';
import bindAuthentification from './lib/bindAuthentification';
import calcMd5 from './lib/calcMd5';
import actions from './redux/actions';
import reducer from './redux';

module.exports = {
  createAuthentification,
  bindAuthentification,
  checkAccess,
  calcMd5,
  authentificationActions: actions,
  authentificationReducer: reducer,
};
