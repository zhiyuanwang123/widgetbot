import { Service } from 'typedi'
import { getRepository } from '@services/Database'
import Guild, { GuildBanType, GuildBanData, GuildBan } from '@entities/Guild'
import { Snowflake } from '@widgetbot/discord.js'

@Service('guild.bans')
export class BansService {
  private guildRepo = getRepository(Guild)

  public async getAll(id: Snowflake): Promise<GuildBan[]> {
    const guild = await this.guildRepo.findOne({ id, bans: { $exists: true } })
    if (!guild) return []

    return guild.bans
  }

  /**
   * Bans a guest
   */
  public async add(
    id: Snowflake,
    ban: { [type in GuildBanType]?: GuildBanData }
  ) {
    for (const [type, data] of Object.entries(ban)) {
      if (type && data)
        await this.guildRepo.updateOne(
          { id },
          { $addToSet: { bans: { type, data } } },
          { upsert: true }
        )
    }
  }

  /**
   * Unbans a guest
   */
  public async remove(
    id: Snowflake,
    ban: { [type in GuildBanType]?: GuildBanData }
  ) {
    for (const [type, data] of Object.entries(ban)) {
      if (type && data)
        await this.guildRepo.updateOne(
          { id },
          { $pull: { bans: { type, data } } }
        )
    }
  }

  /**
   * Checks if a user is banned
   */
  public async isUserBanned(guildID: Snowflake, guest: string, ip: string) {
    const bans = await this.getAll(guildID)

    const ban = bans.find(ban => {
      switch (ban.type) {
        case 'ip':
          if (ban.data === ip) return true

        case 'id':
          if (ban.data === guest) return true

        default:
          return false
      }
    })

    return !!ban
  }
}
