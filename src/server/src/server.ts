import './utils/polyfills'

import App from '@app'
import config from '@lib/config'
import { raven } from '@lib/logger'
import Database from '@services/Database'
import Metrics from '@services/Metrics'
import Discord from 'engine'
import { Container, Inject, Service } from 'typedi'

Container.set('test', 'helllo')
@Service('server')
class Server {
  @Inject(type => App)
  private appService: App

  @Inject(type => Database)
  private databaseService: Database

  @Inject(type => Discord)
  private discordService: Discord

  @Inject(type => Metrics)
  private metricsService: Metrics

  public async start() {
    await Promise.all([
      this.databaseService.createConnection(),
      this.discordService.login(config.discord.token)
    ])

    this.metricsService.startProbing()

    this.appService.bootstrap()
    this.appService.start()
  }

  public async stop() {}
}

const server = Container.get(Server)
if (!module.parent) raven.context(() => server.start())

export default server
