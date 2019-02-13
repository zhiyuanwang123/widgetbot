import logger from '@lib/logger'
import { configurator } from '@utils/paths'
import express, { Request, Response } from 'express'
import fs from 'fs'
import path from 'path'
import request from 'request'
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers'

const index = path.join(configurator, 'index.html')
const serveStatic = fs.existsSync(index)

if (!serveStatic) {
  logger.warn(`Couldn't find index.html, proxying from WidgetBot.io`, {
    from: 'Express#Proxy'
  })
}

@Middleware({ type: 'after' })
class CatchAllRoutes implements ExpressMiddlewareInterface {
  use = serveStatic
    ? express.static(configurator)
    : (req: Request, res: Response, next: (err?: any) => any) => {
        if (!res.headersSent) {
          if (/^\/(?:api|\.well-known)\//.test(req.path)) return next()

          return request(`https://widgetbot.io/${req.url}`).pipe(res)
        }

        next()
      }
}

export default CatchAllRoutes
