import createAuthentification from './lib/createAuthentification';
import checkAccess from './lib/checkAccess';
import calcMd5 from './lib/calcMd5';
import actions from './redux/actions';
import reducer from './redux';

module.exports = {
  createAuthentification,
  checkAccess,
  calcMd5,
  authentificationActions: actions,
  authentificationReducer: reducer,
};
