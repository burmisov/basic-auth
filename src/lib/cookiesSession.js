import session from 'express-session';

export default function () {
  return [session({
    secret: 'some secret',
    resave: true,
    saveUninitialized: true,
  })];
}
