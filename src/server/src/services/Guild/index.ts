import { Service, Inject } from 'typedi'
import Theme from '@entities/Theme'
import DatabaseService from '@services/Database'
import Guild from '@entities/Guild'
import { GuestsService } from './Guests'
import { BansService } from './Bans'
import { Snowflake } from '@widgetbot/discord.js'

@Service('guild')
class GuildService {
  @Inject(type => DatabaseService)
  public databaseService: DatabaseService

  @Inject() public bans: BansService

  @Inject() public guests: GuestsService

  public async get(id: Snowflake) {
    const guild = await this.databaseService.connection.guild({ id })

    return guild
  }

  /**
   * Overwrites the theme for the guild
   */
  public async setTheme(id: Snowflake, theme: string) {
    await this.databaseService.connection.updateGuild({
      where: { id },
      data: { theme: { connect: { id: theme } } }
    })
  }
}

export default GuildService
export * from './Bans'
export * from './Guests'
