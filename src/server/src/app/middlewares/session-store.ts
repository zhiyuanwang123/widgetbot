import { client } from '@services/Redis'
import session from 'express-session'
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers'
import connectRedis from 'connect-redis'

const RedisStore = connectRedis(session)

@Middleware({ type: 'before' })
export class SessionStore implements ExpressMiddlewareInterface {
  public store = new RedisStore({
    client: client
  })

  public use = session({
    secret: 'asd', // TODO: !DO NOT LET INTO PRODUCTION! Change
    store: this.store,
    resave: false,
    saveUninitialized: false,
    name: 'widgetbot.token'
  })
}
