<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

```bash
pnpm add express-session
pnpm add -D @types/express-session

pn add @nestjs/jwt
```

jwt payload:
```json
{ count: 2, iat: 1733046208, exp: 1733049808 }
```

session:
```js
Session {
  cookie: { path: '/', _expires: null, originalMaxAge: null, httpOnly: true }
}
Session {
  cookie: { path: '/', _expires: null, originalMaxAge: null, httpOnly: true },
  count: 1
}
```

## LoginGuard 守卫
localhost:3001/logined
