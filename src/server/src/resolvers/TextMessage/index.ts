import * as Discord from '@widgetbot/discord.js'
import { Resolver, FieldResolver, Root } from 'type-graphql'
import { TextMessage } from '@entities/Message'
import { EmojiResolver } from '@resolvers'
import { CacheService, Metadata } from '@services/Messaging'
import { Inject } from 'typedi'
import Channel from '@entities/Channel'
import { ChannelResolver } from '../Channel'
import { IMember } from '@entities/IMember'

@Resolver(of => TextMessage)
export class TextMessageResolver {
  @Inject() private metadataService: Metadata
  @Inject() private cacheService: CacheService

  @FieldResolver()
  reactions(@Root() root) {
    const reactions = root.reactions.array()
    const resolved = reactions.map(EmojiResolver.resolve)

    return resolved
  }

  @FieldResolver()
  async content(@Root() message) {
    const extraction = await this.metadataService.extract(message)
    if (!extraction) return message.content

    return extraction.cleanedContent
  }

  @FieldResolver()
  async embeds(@Root() message) {
    const extraction = await this.metadataService.extract(message)
    if (!extraction) return message.embeds

    return extraction.filteredEmbeds
  }

  @FieldResolver(type => Channel)
  channel(@Root() message) {
    return ChannelResolver.resolve(message.channel)
  }

  @FieldResolver(type => IMember)
  async author(@Root() message) {
    return await this.cacheService.resolveMessageAuthor(message)
  }
}
