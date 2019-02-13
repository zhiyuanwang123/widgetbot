import session from 'express-session'
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers'
import connectRedis from 'connect-redis'
import { RedisService } from '@services/Redis'
import { Inject } from 'typedi'

const RedisStore = connectRedis(session)

@Middleware({ type: 'before' })
export class SessionStore implements ExpressMiddlewareInterface {
  @Inject(type => RedisService)
  private redisService: RedisService

  public store = new RedisStore({
    client: this.redisService.client
  })

  public use = session({
    secret: 'asd', // @TODO: Change
    store: this.store,
    resave: false,
    saveUninitialized: false,
    name: 'widgetbot.token'
  })
}
