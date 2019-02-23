import {
  Args,
  Mutation,
  Resolver,
  Root,
  Subscription,
  Authorized,
  Ctx
} from 'type-graphql'
import { SendMessageArgs } from '@entities/Message/mutation'
import { Filter, filter } from '@entities/subscription.type'

import * as Topics from '../subscriptions'
import Message, { TextMessage } from '@entities/Message'
import { Inject } from 'typedi'
import GuildService from '@services/Guild'
import { CacheService } from '@services/Messaging'
import { Context } from '@app'

@Resolver()
export class MessageResolver {
  @Inject() private guildService: GuildService
  @Inject() private cacheService: CacheService

  @Subscription(type => Message, {
    topics: Topics.MESSAGE,
    filter
  })
  async message(@Root() message, @Args() args: Filter) {
    return await this.cacheService.parse(message)
  }

  @Subscription(type => Message, {
    topics: Topics.MESSAGE_UPDATE,
    filter
  })
  async messageUpdate(@Root() message, @Args() args: Filter) {
    return await this.cacheService.parse(message)
  }

  @Subscription(type => [Message], {
    topics: Topics.MESSAGE_DELETE,
    filter
  })
  async messageDelete(@Root() data: any[], @Args() args: Filter) {
    return await Promise.all(
      data.map(message => this.cacheService.parse(message))
    )
  }

  @Mutation(type => TextMessage, { nullable: true })
  @Authorized()
  async sendMessage(
    @Args() { channel, content }: SendMessageArgs,
    @Ctx() { user }: Context
  ) {
    const message = await this.guildService.guests.sendMessage(
      channel,
      user,
      content
    )

    return this.cacheService.parse(message)
  }
}
