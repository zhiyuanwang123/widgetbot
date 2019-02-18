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
import {
  MessageDeleteSub,
  MessageSub,
  MessageUpdateSub
} from '@entities/Message/subscription'
import { Filter, filter } from '@entities/subscription.type'

import * as Topics from '../subscriptions'
import { TextMessage } from '@entities/Message'
import { Inject } from 'typedi'
import GuildService from '@services/Guild'
import { CacheService } from '@services/Messaging'
import { Context } from '@app'

@Resolver()
export class MessageResolver {
  @Inject() private guildService: GuildService

  @Inject() private cacheService: CacheService

  @Subscription({
    topics: Topics.MESSAGE,
    filter
  })
  message(@Root() data: MessageSub, @Args() args: Filter): MessageSub {
    return data
  }

  @Subscription({
    topics: Topics.MESSAGE_UPDATE,
    filter
  })
  messageUpdate(
    @Root() data: MessageUpdateSub,
    @Args() args: Filter
  ): MessageUpdateSub {
    return data
  }

  @Subscription({
    topics: Topics.MESSAGE_DELETE,
    filter
  })
  messageDelete(
    @Root() data: MessageDeleteSub,
    @Args() args: Filter
  ): MessageDeleteSub {
    return data
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
