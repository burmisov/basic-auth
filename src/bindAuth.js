export default function (redux, notAuthorizedHandler, accessDeniedHandler) {
  return (accessLevel) => (nextState, transition) => {
    // Если указанные уровни маршрута не совпадают
    // то отрабатывается либо переход на форму аутентификации
    // либо говорит о том что доступ запрещен
    // const storeState = redux.getState();
    //
    // const currentAccessLevels = storeState.authUser;
    //
    // if (checkAccessHandler(accessLevel, currentAccessLvl)) {
    //   return;
    // }
    //
    // if (!isAuthorized(state)) {
    //   notAuthorizedHandler(nextState, transition);
    //   return;
    // }
    //
    // accessDeniedHandler(nextState, transition);
  };
}
