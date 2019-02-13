import logger from '@lib/logger'
import expressWinston from 'express-winston'
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers'

@Middleware({ type: 'after' })
class Logger implements ExpressMiddlewareInterface {
  public use = ['debug', 'silly'].includes(logger.level)
    ? expressWinston.logger({
        winstonInstance: logger,
        level: logger.level,
        transports: [],
        meta: logger.level === 'silly',
        msg: 'HTTP {{req.method}} {{req.url}}'
      })
    : null
}

export default Logger
