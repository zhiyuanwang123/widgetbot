import passport from 'passport'
import { Service, Inject } from 'typedi'
import Strategy from './strategy'
import Discord from 'engine'

@Service('discord.passport')
export class DiscordPassport {
  private strategy: Strategy

  @Inject(type => Discord)
  private discordService: Discord

  start() {
    this.strategy = new Strategy({
      clientID: this.discordService.client.user.id,
      clientSecret: this.discordService.client.token,
      callbackURL: 'https://t.com'
    })
    passport.use(this.strategy)
  }
}
