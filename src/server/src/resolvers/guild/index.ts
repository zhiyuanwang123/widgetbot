import { ResolverInterface } from '@utils/type-graphql'
import * as Discord from '@widgetbot/discord.js'
import { client } from 'engine'
import {
  Args,
  FieldResolver,
  Query,
  Resolver,
  Root,
  Ctx,
  Authorized,
  Field,
  ArgsType
} from 'type-graphql'
import Guild, { GuildArgs, GuildChannelArgs } from '@entities/Guild'
import { ChannelResolver } from '@resolvers'
import GuildService from '@services/Guild'
import { Inject } from 'typedi'
import { Context } from '@app'
import typify from '@utils/typify'
import GuildMember from '@entities/GuildMember'
import { AvatarOptions } from '@entities/AvatarOptions'
import { Min } from 'class-validator'
import { GuestMember } from '@entities/GuestMember'

@ArgsType()
export class GuildMembersArgs {
  @Field({ nullable: true })
  @Min(0)
  limit?: number
}

@Resolver(of => Guild)
export class GuildResolver implements ResolverInterface<Guild, Discord.Guild> {
  @Inject() private guildService: GuildService

  @Query(returns => Guild, { nullable: true })
  guild(@Args() { id }: GuildArgs) {
    return client.guilds.get(id)
  }

  @FieldResolver()
  channels(
    @Root() guild: Discord.Guild,
    @Args() { type }: GuildChannelArgs
  ): any {
    const channels = guild.channels.array()

    return channels
      .map(ChannelResolver.resolve)
      .filter(channel => !type || channel.constructor.name === type)
      .filter(Boolean)
  }

  @FieldResolver()
  members(
    @Root() guild: Discord.Guild,
    @Args() { limit }: GuildMembersArgs
  ): any {
    const members = limit ? guild.members.first(limit) : guild.members.array()

    return members.map(member => typify(GuildMember, member))
  }

  @FieldResolver()
  iconURL(@Root() guild, @Args() options: AvatarOptions) {
    return guild.iconURL(options)
  }

  @FieldResolver()
  async theme(@Root() guild) {
    const theme: any = await this.guildService.getTheme(guild.id)

    return theme
  }

  @FieldResolver()
  @Authorized()
  async me(@Root() guild: Discord.Guild, @Ctx() { user }: Context) {
    const guest: any = await this.guildService.guests.get(
      guild.id,
      user.profileId
    )

    return guest
  }

  @FieldResolver()
  async guests(@Root() guild: Discord.Guild) {
    const guests = await this.guildService.guests.getAll(guild.id)

    return guests.map(guest => typify(GuestMember, guest)) as any[]
  }

  @FieldResolver()
  async bans(@Root() guild: Discord.Guild) {
    const bans = await this.guildService.bans.getAll(guild.id)
    return bans
  }
}
