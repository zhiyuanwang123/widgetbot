import { Service, Inject } from 'typedi'
import { Snowflake } from '@widgetbot/discord.js'
import { getGuildFromChannel } from '@utils'
import { User } from '@app'

import { BansService } from '@services/Guild'
import MessagingService from '@services/Messaging'
import ProfilesService from '@services/Profiles'

import Guild, { GuildGuest } from '@entities/Guild'
import DatabaseService from '@services/Database'

@Service('guild.guests')
export class GuestsService {
  @Inject(type => ProfilesService)
  private profilesService: ProfilesService

  @Inject(type => MessagingService)
  private messagingService: MessagingService

  @Inject(type => BansService)
  private bansService: BansService

  @Inject(type => DatabaseService)
  private databaseService: DatabaseService

  /**
   * Gets a guest by their ID from a guild
   */
  public async get(id: Snowflake, guest: string): Promise<GuildGuest> {
    const [guildGuest] = await this.databaseService.connection
      .guild({ id })
      .guests<GuildGuest[]>({ where: { id: guest } })

    return guildGuest
  }

  /**
   * Gets all the guests in the guild
   */
  public async getAll(id: string): Promise<GuildGuest[]> {
    const guests = await this.databaseService.connection.guildGuests({
      where: {
        guild: {
          id
        }
      }
    })

    return guests
  }

  /**
   * Adds a profile to a guild
   */
  public async add(id: Snowflake, profile: string) {
    await this.databaseService.connection.createGuildGuest({
      profile: {
        connect: { id: profile }
      },
      nickname: null,
      guild: { connect: { id } }
    })
  }

  /**
   * Clears the guest from a guild, resets nickname, total message count etc.
   */
  public async remove(id: Snowflake, guest: string) {
    await this.guildRepo.updateOne({ id }, { $pull: { guests: { id: guest } } })
  }

  public async setNickname(id: Snowflake, profile: string, nickname: string) {
    if (!nickname) nickname = null
    // await this.add(id, guest)

    await this.guildRepo.updateOne(
      { id, 'guests.id': guest },
      { $set: { 'guests.$.nickname': nickname } }
    )
  }

  /**
   * Guest's nickname if they have one, or their username
   */
  public async getName(id: Snowflake, guest: string) {
    const guildGuest = await this.get(id, guest)

    if (guildGuest) {
      if (guildGuest.nickname !== null) return guildGuest.nickname
    }

    const profile = await this.profilesService.get(guest)
    return profile ? profile.username : null
  }

  /**
   * Send a message
   */
  public async sendMessage(channelID: Snowflake, user: User, content: string) {
    const guild = getGuildFromChannel(channelID)
    const banned = await this.bansService.isUserBanned(guild, user.id, user.ip)

    if (banned) throw `You have been banned!`

    const message = await this.messagingService.sendMessage(
      channelID,
      user.id,
      content
    )

    return message
  }
}
