import { Service, Inject } from 'typedi'
import DatabaseService from '@services/Database'
import { GuestsService } from './Guests'
import { BansService } from './Bans'
import { Snowflake } from '@widgetbot/discord.js'

@Service('guild')
class GuildService {
  @Inject(type => DatabaseService)
  public databaseService: DatabaseService

  @Inject() public bans: BansService
  @Inject() public guests: GuestsService

  public async get(snowflake: Snowflake) {
    return await this.databaseService.connection.guild({ snowflake })
  }

  public async getTheme(snowflake: Snowflake) {
    return await this.databaseService.connection.guild({ snowflake }).theme()
  }

  public async setTheme(snowflake: Snowflake, theme: string) {
    return await this.databaseService.connection.updateGuild({
      where: { snowflake },
      data: { theme: { connect: { id: theme } } }
    })
  }
}

export default GuildService
export * from './Bans'
export * from './Guests'
