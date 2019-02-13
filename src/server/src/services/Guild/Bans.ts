import { Service, Inject } from 'typedi'
import { GuildBanType, GuildBanData } from '@entities/Guild'
import { Snowflake } from '@widgetbot/discord.js'
import DatabaseService from '@services/Database'

@Service('guild.bans')
export class BansService {
  @Inject(type => DatabaseService)
  private databaseService: DatabaseService

  public async getAll(id: Snowflake) {
    const bans = await this.databaseService.connection.guild({ id }).bans()
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
  public async checkBanned(guildID: Snowflake, profile: string, ip: string) {
    const [ban] = await this.databaseService.connection.guildBans({
      where: {
        guild: { id: guildID },
        OR: [{ type: 'id', data: profile }, { type: 'ip', data: ip }]
      }
    })

    return ban
  }
}
