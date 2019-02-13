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
  Mutation,
  Arg
} from 'type-graphql'
import Guild, {
  GuildArgs,
  GuildChannelArgs,
  GuildBanArgs
} from '@entities/Guild'
import ChannelResolver from '@resolvers/Channel'
import ImageOptions from '@entities/InputTypes/ImageOptions'
import GuildService from '@services/Guild'
import { Inject } from 'typedi'

@Resolver(of => Guild)
class GuildResolver implements ResolverInterface<Guild, Discord.Guild> {
  @Inject() private guildService: GuildService

  @Mutation(type => Boolean)
  async banGuest(@Args() { guild, id, ip }: GuildBanArgs) {
    await this.guildService.bans.add(guild, { ip, id })

    return true
  }

  @Mutation(type => Boolean)
  async unbanGuest(@Args() { guild, id, ip }: GuildBanArgs) {
    await this.guildService.bans.remove(guild, { ip, id })

    return true
  }

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
  iconURL(@Root() guild, @Args() options: ImageOptions) {
    return guild.iconURL(options)
  }

  @FieldResolver()
  theme() {
    return {
      css: '',
      colors: {
        primary: 'white',
        accent: 'cyan',
        background: 'black'
      }
    }
  }

  @FieldResolver()
  @Authorized()
  async me(@Root() guild: Discord.Guild, @Ctx() { user }: Context) {
    const guest = await this.guildService.guests.get(guild.id, user.id)

    return guest
  }

  @FieldResolver()
  async guests(@Root() guild: Discord.Guild) {
    const guests = await this.guildService.guests.getAll(guild.id)
    return guests
  }

  @FieldResolver()
  async bans(@Root() guild: Discord.Guild) {
    const bans = await this.guildService.bans.getAll(guild.id)
    return bans
  }
}

export default GuildResolver
