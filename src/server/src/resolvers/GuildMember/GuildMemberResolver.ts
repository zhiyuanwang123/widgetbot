import * as Discord from '@widgetbot/discord.js'
import {
  Resolver,
  ResolverInterface,
  FieldResolver,
  Root,
  Args
} from 'type-graphql'
import GuildMember from '@entities/GuildMember'
import { AvatarOptions } from '@entities/AvatarOptions'

@Resolver(of => GuildMember)
export class GuildMemberResolver implements ResolverInterface<GuildMember> {
  @FieldResolver()
  roles(@Root() guildMember) {
    return guildMember.roles.array()
  }

  @FieldResolver()
  avatarURL(@Root() guildMember, @Args() options: AvatarOptions): string {
    return guildMember.user.avatarURL(options)
  }
}
