import {
  Resolver,
  FieldResolver,
  Root,
  ResolverInterface,
  Mutation,
  Authorized,
  Arg,
  ArgsType,
  Field,
  Args,
  Ctx
} from 'type-graphql'
import { GuildGuest } from '@entities/Guild'
import ProfilesService from '@services/Profiles'
import { Inject } from 'typedi'
import { Snowflake } from '@utils/scalars'
import { GuestsService } from '@services/Guild'
import { Context } from '@app'

@ArgsType()
export class JoinGuildArgs {
  @Field(type => Snowflake)
  guild: string
}

@ArgsType()
export class LeaveGuildArgs {
  @Field(type => Snowflake)
  guild: string
}

@Resolver(of => GuildGuest)
export class GuildGuestResolver implements ResolverInterface<GuildGuest> {
  @Inject() private profilesService: ProfilesService

  @Inject() private guestsService: GuestsService

  @FieldResolver()
  async profile(@Root() guildGuest) {
    return await this.profilesService.getGuestProfile(guildGuest.id)
  }

  @Authorized()
  @Mutation(type => Boolean)
  async joinGuild(@Args() { guild }: JoinGuildArgs, @Ctx() { user }: Context) {
    await this.guestsService.joinGuild(guild, user.profileId)
    return true
  }

  @Authorized()
  @Mutation(type => Boolean)
  async leaveGuild(
    @Args() { guild }: LeaveGuildArgs,
    @Ctx() { user }: Context
  ) {
    await this.guestsService.leaveGuild(guild, user.profileId)
    return true
  }
}
