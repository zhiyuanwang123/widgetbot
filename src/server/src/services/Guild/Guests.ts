import { Service, Inject } from 'typedi'
import { Snowflake } from '@widgetbot/discord.js'
import { getGuildFromChannel } from '@utils'
import { User } from '@app'

import { BansService } from '@services/Guild'
import MessagingService from '@services/Messaging'
import ProfilesService from '@services/Profiles'

import DatabaseService from '@services/Database'
import * as DB from '@widgetbot/database'

const gql = String.raw

interface GuildGuest extends DB.GuildGuest {
  guild: {
    snowflake: string
  }
  profile: {
    id: string
  }
}

const GUEST_FRAGMENT = gql`
  fragment GuestsSelection on Guest {
    guild {
      snowflake
    }
    nickname
    profile {
      id
    }
  }
`

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
  public async get(snowflake: Snowflake, profileId: string) {
    const [guildGuest] = await this.databaseService.connection
      .guild({ snowflake })
      .guests({ where: { profile: { id: profileId } } })
      .$fragment<GuildGuest[]>(GUEST_FRAGMENT)

    return guildGuest
  }

  /**
   * Gets all the guests in the guild
   */
  public async getAll(snowflake: string) {
    const guests = await this.databaseService.connection
      .guildGuests({
        where: {
          guild: { snowflake }
        }
      })
      .$fragment<GuildGuest[]>(GUEST_FRAGMENT)

    return guests
  }

  /**
   * Adds a profile to a guild
   */
  public async joinGuild(snowflake: Snowflake, profileId: string) {
    const [existingGuest] = await this.databaseService.connection.guildGuests({
      where: { guild: { snowflake }, profile: { id: profileId } }
    })

    if (existingGuest) return existingGuest

    return await this.databaseService.connection
      .createGuildGuest({
        profile: {
          connect: { id: profileId }
        },
        nickname: null,
        guild: { connect: { snowflake } }
      })
      .$fragment<GuildGuest>(GUEST_FRAGMENT)
  }

  /**
   * Clears the guest from a guild, resets nickname, total message count etc.
   */
  public async leaveGuild(snowflake: Snowflake, profileId: string) {
    await this.databaseService.connection.deleteManyGuildGuests({
      guild: { snowflake },
      profile: { id: profileId }
    })
  }

  public async setNickname(
    snowflake: Snowflake,
    profile: string,
    nickname: string
  ) {
    if (!nickname) nickname = null

    await this.databaseService.connection.updateManyGuildGuests({
      where: {
        guild: { snowflake },
        profile: { id: profile }
      },
      data: { nickname }
    })
  }

  /**
   * Guest's nickname if they have one, or their username
   */
  public async displayName(snowflake: Snowflake, profileId: string) {
    const guildGuest = await this.get(snowflake, profileId)

    if (guildGuest) {
      if (guildGuest.nickname !== null) return guildGuest.nickname
    }

    const profile = await this.profilesService.get(profileId)
    return profile ? profile.username : null
  }

  /**
   * Send a message
   */
  public async sendMessage(channelID: Snowflake, user: User, content: string) {
    const guild = getGuildFromChannel(channelID)

    const ban = await this.bansService.checkBanned(
      guild,
      user.profileId,
      user.ip
    )
    if (ban) throw `You have been banned!`

    const guest = await this.joinGuild(guild, user.profileId)

    const message = await this.messagingService.sendMessage(
      channelID,
      user.profileId,
      content
    )

    return message
  }
}
