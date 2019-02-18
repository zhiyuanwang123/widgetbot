import { Service, Inject } from 'typedi'
import { Snowflake } from '@widgetbot/discord.js'
import DatabaseService from '@services/Database'

const gql = String.raw

const BanFragment = gql`
  fragment BanFragment on GuildBan {
    profile {
      id
    }
    ip
  }
`

type BanData = { profileId?: string; ip?: string }

@Service('guild.bans')
export class BansService {
  @Inject(type => DatabaseService)
  private databaseService: DatabaseService

  public async getAll(snowflake: Snowflake) {
    return await this.databaseService.connection
      .guild({ snowflake })
      .bans()
      .$fragment<any>(BanFragment)
  }

  /**
   * Bans a guest
   */
  public async add(snowflake: Snowflake, { profileId, ip }: BanData) {
    if (!profileId && !ip) throw `Profile or IP is required to ban guest!`

    return await this.databaseService.connection
      .createGuildBan({
        guild: { connect: { snowflake } },
        ...(profileId && { profile: { connect: { id: profileId } } }),
        ip
      })
      .$fragment<any>(BanFragment)
  }

  /**
   * Unbans a guest
   */
  public async remove(snowflake: Snowflake, { profileId, ip }: BanData) {
    await this.databaseService.connection.deleteManyGuildBans({
      guild: { snowflake },
      OR: [{ ip }, { profile: { id: profileId } }]
    })
  }

  /**
   * Checks if a user is banned
   */
  public async checkBanned(snowflake: Snowflake, profile: string, ip?: string) {
    const [ban] = await this.databaseService.connection
      .guildBans({
        where: {
          guild: { snowflake },
          OR: [{ profile: { id: profile } }, { ip }]
        }
      })
      .$fragment<any>(BanFragment)

    return ban
  }
}
