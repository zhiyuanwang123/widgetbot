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
import { GuestMember } from '@entities/GuestMember'
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

@Resolver(of => GuestMember)
export class GuestMemberResolver implements ResolverInterface<GuestMember> {
  @Inject() private profilesService: ProfilesService
  @Inject() private guestsService: GuestsService

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

  @FieldResolver()
  async profile(@Root() guestMember) {
    return await this.profilesService.getGuestProfile(guestMember.id)
  }

  @FieldResolver(type => String)
  async displayName(@Root() guestMember) {
    if (guestMember.nickname) return guestMember.nickname

    const profile = await this.profilesService.getGuestProfile(guestMember.id)
    return profile.username
  }
}
