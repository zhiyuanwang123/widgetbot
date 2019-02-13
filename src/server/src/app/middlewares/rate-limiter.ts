import config from '@lib/config'
import RateLimit from 'express-rate-limit'
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers'

@Middleware({ type: 'before' })
export class RateLimiter implements ExpressMiddlewareInterface {
  public use = new RateLimit({
    windowMs: 1,
    delayAfter: 0,
    ...(!config.development && config.express.rateLimit)
  })
}
