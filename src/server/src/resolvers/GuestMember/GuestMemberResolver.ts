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
import { AvatarOptions } from '@entities/AvatarOptions'
import User from '@entities/User'

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
    return await this.profilesService.get(guestMember.profile.id)
  }

  @FieldResolver(type => String)
  async displayName(@Root() guestMember) {
    if (guestMember.nickname) return guestMember.nickname

    const profile = await this.profilesService.get(guestMember.profile.id)
    return profile.username
  }

  @FieldResolver(type => User)
  async user(@Root() guestMember) {
    const user = await this.profilesService.getDiscordUser(guestMember.id)

    return user as any
  }

  @FieldResolver(type => String)
  async avatarURL(@Root() guestMember, @Args() options: AvatarOptions) {
    const user = await this.profilesService.getDiscordUser(guestMember.id)
    if (!user) return 'https://cdn.discordapp.com/embed/avatars/0.png'

    return user.avatarURL(options as any)
  }
}
