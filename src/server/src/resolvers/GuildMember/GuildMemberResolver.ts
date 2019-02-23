import * as Discord from '@widgetbot/discord.js'
import { Resolver, ResolverInterface, FieldResolver, Root } from 'type-graphql'
import GuildMember from '@entities/GuildMember'

@Resolver(of => GuildMember)
export class GuildMemberResolver implements ResolverInterface<GuildMember> {
  @FieldResolver()
  roles(@Root() guildMember) {
    return guildMember.roles.array()
  }
}
