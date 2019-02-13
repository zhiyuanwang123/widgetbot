import MessagingService, { CacheService } from '@services/Messaging'
import { ResolverInterface } from '@utils/type-graphql'
import * as Discord from '@widgetbot/discord.js'
import { Args, FieldResolver, Resolver, Root, Ctx } from 'type-graphql'
import TextChannel, { MessagesArgs } from '@entities/TextChannel'
import { Inject } from 'typedi'

@Resolver(of => TextChannel)
export class TextChannelResolver
  implements ResolverInterface<TextChannel, Discord.TextChannel> {
  @Inject() private cacheService: CacheService

  @FieldResolver()
  async messages(
    @Root() { id },
    @Args() options: MessagesArgs,
    @Ctx() { session }: Context
  ): Promise<any> {
    const messages = await this.cacheService.fetch(id, options)

    return messages
  }
}
