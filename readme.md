Подключение модуля
================

На сервере:
------------
Для хранения логинов, ролей и прочей информации, необходимой для работы модуля,
необходимо описать хранилище данных (в примере реализовано в виде простого JSON).

Обязательно должны быть определены следующие функции:

```js
getAccessTypes(callback)
getUsers(callback)
getRoles(callback)
```

Для конфигурации серверной части необходимо сделать импориторивать необходимое
```js
import { routes, checkAccess, cookiesSession } from '../../src';
```
и использовать следующим образом:

```js
//...
const store = createStore(path.join(__dirname, '../data/store.json'));
//...
// routes возвратит массив из middleware используемый роутером приложения
router.use(routes(store));
// cookiesSession вернет middleware
app.use(cookiesSession());
//...
```

На клиенте:
------------

Необходимо подключить reducers модуля

```js
import { reducers } from '../../../src';
//...
const reduxStore = createThunkedStore(combineReducers({
  ...reducers,
  ...appReducers,
}));
```

Защита ресурсов:
------------------------

На сервере:

Во-первых текущий пользователь хранится в req.session.user, он и будет
использоваться для проверки в основной функции проверки checkAccess

```js
checkAccess(user, permission, resourceId)
```
permission - в качестве параметра указывается строка и именем по которому хотите
чтобы был осуществлен доступ, который задается в типах доступа

resourceId - обычно это id ресурса (например слоя), но также может быть например
имя маршрута, для того чтобы запретить доступ на клиенте.

Также можно сделать кастомную проверку пра анализируя req.session.user

На клиенте:

После подключения модуля на клиенте в store у нас хранится пользователь который можно получить в select обратившись state.user.

Защита маршрута:

Необходимо в месте где создаются маршруты подключить:

```js
import { bindAuthentification } from '../../src';

и определить функцию, которую будем использовать на событии onEnter в маршруте.
(пример без комментариев)
```

```js
const requireAccess = bindAuthentification(reduxStore, (nextState, replaceState) => {
  replaceState({
    next: nextState.location.pathname,
    accessPermissions: nextState.accessPermission,
    resourceId: nextState.resourceId,
  });
}, (nextState, replaceState) => {
  replaceState({}, '/403');
});
```
Защита маршрута:

1-ый способ:

использовать универсальную функция checkAccess (описано выше).

2-ой способ:

анализировать user в store например:

```js
user.getIn['roles', 'accessPermissions', accessType, resourceId]
```

TODO
------------
- Доделать пример
- Кристализовать пример без авторизации
- Дописать ридми по составу хранилища с ролями, пользователями ит.д.
- Сделать модуль конфигурируемым
- Как-то передать в экшены модуля basename (тоесть например /api как в примере)
- Что-то еще, что забыл

Запуск примера:
------------
```sh
git clone https://github.com/tetarenko/auth
npm run example
```

[http://localhost:3000](http://localhost:3000)
