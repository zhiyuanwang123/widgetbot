import { FieldResolver, Root, Resolver } from 'type-graphql'
import { ChannelResolver } from '../Channel'
import { Inject } from 'typedi'
import { CacheService } from '@services/Messaging'
import typify from '@utils/typify'
import { PinnedMessage } from '@entities/Message'
import Channel from '@entities/Channel'
import { IMember } from '@entities/IMember'

@Resolver(of => PinnedMessage)
export class PinnedMessageResolver {
  @Inject() private cacheService: CacheService

  @FieldResolver(type => Channel)
  channel(@Root() message) {
    return ChannelResolver.resolve(message.channel)
  }

  @FieldResolver(type => IMember)
  async author(@Root() message) {
    return await this.cacheService.resolveMessageAuthor(message)
  }
}
