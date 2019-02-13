import { Service, Inject } from 'typedi'
import Theme from '@entities/Theme'
import { getRepository } from '@services/Database'
import Guild from '@entities/Guild'
import { GuestsService } from './Guests'
import { BansService } from './Bans'
import { Snowflake } from '@widgetbot/discord.js'

@Service('guild')
class GuildService {
  private guildRepo = getRepository(Guild)

  @Inject() public bans: BansService

  @Inject() public guests: GuestsService

  public async get(id: Snowflake): Promise<Guild> {
    const guild = await this.guildRepo.findOne({ id })
    return guild
  }

  /**
   * Overwrites the theme for the guild
   */
  public async setTheme(id: Snowflake, theme: Theme) {
    await this.guildRepo.updateOne(
      { id },
      { $set: { theme } },
      { upsert: true }
    )
  }
}

export default GuildService
export * from './Bans'
export * from './Guests'
