import * as Discord from '@widgetbot/discord.js'
import GuestMember from '@entities/GuestMember'
import GuildMember, { createGuildMember } from '@entities/GuildMember'
import Member from '@entities/Member'
import Message, { TextMessage, IMessage } from '@entities/Message'
import Messages from '@utils/messages'
import typify from '@utils/typify'
import autobind from 'autobind-decorator'
import { client } from 'engine'
import { Inject, Service } from 'typedi'

import { Metadata } from './Metadata'
import { sortByTimestamp, resolveMessageType } from './utils'
import { ChannelResolver } from '@resolvers'
import TextChannel from '@entities/TextChannel'

type Messages = Discord.Collection<Discord.Snowflake, Discord.Message>

interface IMessagesServiceOptions {
  after?: string
  around?: string
  before?: string
  limit?: number
}

@Service('messaging.cache')
export class CacheService {
  @Inject(type => Metadata)
  private metadataService: Metadata

  /**
   * Fetches the messages for a channel
   */
  public async fetch(
    id: Discord.Snowflake,
    // TODO: Extract default limit into configuration
    { after, around, before, limit = 40 }: IMessagesServiceOptions
  ): Promise<Message[]> {
    const channel = client.channels.get(id) as Discord.TextChannel

    if (!channel) throw Messages.BAD_CHANNEL
    if (channel.type !== 'text') throw Messages.CHANNEL_NOT_TEXT

    // Whether the messages are the latest
    const latestMessages = !(after || around || before)

    // Check if the messages are cached
    const cached =
      latestMessages &&
      // Message store isn't empty
      channel.messages.size !== 0 &&
      // Have enough messages to fulfill request
      channel.messages.size >= limit

    // Return from cache or API
    const messages = cached
      ? channel.messages
      : await channel.messages.fetch({
          after,
          around,
          before,
          limit
        })

    const parsed = await Promise.all(
      messages
        .sort(sortByTimestamp)
        .last(limit)
        .map(this.parse)
    )

    // Remove all unsupported Message Types
    return parsed.filter(Boolean)
  }

  private async resolveUser(message: Discord.Message) {
    if (message.type === 'DEFAULT') {
      const extraction = await this.metadataService.extractAndPatch(message)

      if (extraction) {
        const user = new GuestMember()
        const profile = await extraction.fetchProfile()

        user.username = extraction.authorName

        return user
      }
    }

    const guildMember = (message.channel as Discord.TextChannel).guild.member(
      message.author
    )

    const user = guildMember ? createGuildMember(guildMember) : new Member()

    return user
  }

  /**
   * Parses the message into a graphql digestible format
   */
  @autobind
  public async parse(message: Discord.Message): Promise<IMessage> {
    if (!message) return null
    const user = await this.resolveUser(message)
    const resolvedMessage = resolveMessageType(message)

    // Switch out author
    resolvedMessage.author = typify(user, message.author)
    resolvedMessage.channel = ChannelResolver.resolve(message.channel)

    return resolvedMessage
  }
}

export * from './Metadata'
export * from './utils'
