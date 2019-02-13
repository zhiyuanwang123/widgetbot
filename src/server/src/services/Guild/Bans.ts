import { Service, Inject } from 'typedi'
import Guild, { GuildBanType, GuildBanData, GuildBan } from '@entities/Guild'
import { Snowflake } from '@widgetbot/discord.js'
import DatabaseService from '@services/Database'

@Service('guild.bans')
export class BansService {
  @Inject(type => DatabaseService)
  private databaseService: DatabaseService

  public async getAll(id: Snowflake): Promise<GuildBan[]> {
    const bans: GuildBan[] = await this.databaseService.connection
      .guild({ id })
      .bans()

    if (!bans) return []

    return bans
  }

  /**
   * Bans a guest
   */
  public async add(
    id: Snowflake,
    ban: { [type in GuildBanType]?: GuildBanData }
  ) {
    for (const [type, data] of Object.entries(ban)) {
      if (!type || !data) continue

      await this.databaseService.connection.upsertGuild({
        where: { id },
        update: { bans: { create: { type, data } } },
        create: {
          bans: { create: { type, data } }
        }
      })
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
      if (!type || !data) continue

      await this.databaseService.connection.updateGuild({
        where: { id },
        data: {
          bans: {
            deleteMany: {
              type,
              data
            }
          }
        }
      })
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
