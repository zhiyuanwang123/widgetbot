import App from '@app'
import logger from '@lib/logger'
import { embed } from '@utils/paths'
import fs from 'fs'
import path from 'path'
import request from 'request'
import { Inject, Service } from 'typedi'

const index = path.join(embed, 'index.html')
const serveStatic = fs.existsSync(index)

if (!serveStatic) {
  logger.warn(
    `No index.html found. Proxying /channels/* -> https://widgetbot.io/channels/*`,
    {
      from: 'Express#Proxy'
    }
  )
}

@Service('embed.controller')
export class EmbedController {
  @Inject(type => App)
  private appService: App

  use() {
    const PATH = '/channels/'

    this.appService.app.use('/channels/', (req, res) => {
      if (serveStatic) {
        return res.sendFile(path.join(embed, req.path), {}, err => {
          if (err) res.sendFile(index)
        })
      }

      request(`https://widgetbot.io/channels${req.path}`).pipe(res)
    })
  }
}
