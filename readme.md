Аутентификация/авторизация
================

На сервере:
------------
Пока хранилище реализовано в виде простого json файла,
в котором хранятся роли, уровни доступа, и пользователи

```js
import auth from '../../src';
import buildStore from '../../src/store/JSONStore';

auth(app, { store: buildStore(path.join(process.cwd(), '/data/store.json')) });
```

На клиенте:
------------

Необходимо подключить редюсеры модуля аутентификации

```js
import reducers from '../reducers';
import auth from '../../../src/redux';
...
const reduxStore = createThunkedStore(combineReducers({
  ...reducers,
  ...auth,
}));

```

Далее для защиты маршрута необходимо определить функцию и вызывать по событие onEnter маршрута:

```js
import bindAuth from '../../src/bindAuth';

...

const requireAccess = bindAuth(reduxStore, (nextState, replaceState) => {
  replaceState({
    next: nextState.location.pathname,
    accessPermission: nextState.accessPermission,
    resourceId: nextState.resourceId,
  });
}, (nextState, replaceState) => {
  replaceState({}, '/403');
});

...

<Route path="/users" component={Users} onEnter={requireAccess('view', 'users')} />

```

Также есть функция для проверки отдельного ресура такого как слой или любой объект который можно однозначно идентифицировать (она же используется для проверки маршрута):

```js
checkAccess(user, accessPermission, resourceId)
```
Но должны быть выполнены следующие требования:

//TODO

Запуск примера:
------------

```sh
git clone https://github.com/tetarenko/auth
npm install
cd auth-example
node index
```

[http://localhost:3000](http://localhost:3000)
