import * as Discord from '@widgetbot/discord.js'
import { Service, Inject } from 'typedi'
import { CacheService } from './Cache'
import { Snowflake } from '@widgetbot/discord.js'
import {
  sanitize,
  appendProfileLink,
  getProfileLink,
  OPEN_PROFILE_EMOTE_NAME,
  OPEN_PROFILE_EMOTE_ID,
  OPEN_PROFILE_FALLBACK,
  extractMentions
} from './utils'
import ProfilesService from '@services/Profiles'
import GuildService from '@services/Guild'
import { getWebhook, getTextChannel, getOrCreateCustomEmoji } from '@utils'
import { getGuildFromChannel } from '@utils/discord/getGuildFromChannel'

@Service('messaging')
class MessagingService {
  @Inject() private profilesService: ProfilesService

  @Inject() private guildService: GuildService

  @Inject() public cache: CacheService

  /**
   * Sends a message from a guest to a channel (either via Webhook, or via the bot)
   * Doesn't perform ban checking
   */
  public async sendMessage(
    channelID: Snowflake,
    guest: string,
    content: string
  ) {
    const channel = getTextChannel(channelID)
    const guild = getGuildFromChannel(channelID)

    const profile = await this.profilesService.get(guest)
    const name = await this.guildService.guests.displayName(guild, guest)
    if (!profile) throw `Couldn't find user!`

    // Attempt to send via webhook
    try {
      // Get (or create) a new webhook
      const webhook = await getWebhook(channel)

      // Webhooks can't send custom emojis, so we need to create a new one for the guild
      // or if no permission, fallback
      const emoji = await getOrCreateCustomEmoji(
        channel,
        [OPEN_PROFILE_EMOTE_NAME, OPEN_PROFILE_EMOTE_ID],
        OPEN_PROFILE_FALLBACK
      )

      // Remove @everyone, @here etc.
      const sanitizedContent = sanitize(content)

      // Add the emoji + link to the profile
      const linkedContent = appendProfileLink(sanitizedContent, guest, emoji)

      // Send message
      var message = (await webhook.send(linkedContent, {
        avatarURL: profile.avatarURL,
        username: name
      })) as Discord.Message
    } catch (e) {
      // Fallback to sending through bot

      // Extract the mentions from the message, as we can't
      // ping people inside embeds
      const mentions = extractMentions(content)

      // Remove @everyone, @here etc.
      const sanitizedContent = sanitize(mentions)

      // Send the message as an embed, with the mentions as the content
      message = (await channel.send(sanitizedContent, {
        embed: {
          description: sanitize(content),
          author: {
            name,
            iconURL: profile.avatarURL,
            url: getProfileLink(guest)
          }
        }
      })) as Discord.Message
    }

    return message
  }
}

export default MessagingService
export * from './Cache'
export * from './utils'
