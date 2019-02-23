import MessagingService, { CacheService } from '@services/Messaging'
import { ResolverInterface } from '@utils/type-graphql'
import * as Discord from '@widgetbot/discord.js'
import {
  Args,
  FieldResolver,
  Resolver,
  Root,
  Ctx,
  ArgsType,
  Field
} from 'type-graphql'
import TextChannel from '@entities/TextChannel'
import { Inject } from 'typedi'
import { Context } from '@app'
import { Min, Max } from 'class-validator'
import { Snowflake } from '@utils/scalars'

const MAX_MESSAGES = 100

@ArgsType()
export class TextChannelMessagesArgs {
  @Field({ nullable: true })
  @Min(0)
  @Max(MAX_MESSAGES)
  limit?: number

  @Field(type => Snowflake, { nullable: true })
  around?: string

  @Field(type => Snowflake, { nullable: true })
  before?: string

  @Field(type => Snowflake, { nullable: true })
  after?: string
}

@Resolver(of => TextChannel)
export class TextChannelResolver
  implements ResolverInterface<TextChannel, Discord.TextChannel> {
  @Inject() private cacheService: CacheService

  @FieldResolver()
  async messages(
    @Root() { id },
    @Args() options: TextChannelMessagesArgs
  ): Promise<any> {
    const messages = await this.cacheService.fetch(id, options)

    return messages
  }
}
