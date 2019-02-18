import {
  FieldResolver,
  Query,
  Resolver,
  Ctx,
  Mutation,
  Args,
  Authorized
} from 'type-graphql'
import ProfilesService from '@services/Profiles'
import { Inject } from 'typedi'
import Profile, {
  SignUpArgs,
  SetNicknameArgs,
  SetUsernameArgs
} from '@entities/Profile'
import GuildService from '@services/Guild'
import { Context } from '@app'

@Resolver(of => Profile)
export class ProfileResolver /*implements ResolverInterface<Profile>*/ {
  @Inject() private profilesService: ProfilesService

  @Inject() private guildService: GuildService

  @FieldResolver()
  id(@Ctx() { user }: Context): string {
    return user.profileId
  }

  @Query(type => Profile, { nullable: true })
  async me(@Ctx() { user, session }: Context) {
    // Not signed in
    if (!user.profileId) return null

    const profile = await this.profilesService.get(user.profileId)

    // Profile doesn't exist, sign them out
    if (!profile) session.profileID = null

    return profile
  }

  @Mutation(type => Profile)
  @Authorized(false)
  async signUp(@Args() { username }: SignUpArgs, @Ctx() { session }: Context) {
    const profile = await this.profilesService.create(username)

    // Sync profile ID with session to database
    session.profileID = profile.id

    return profile
  }

  @Mutation({ nullable: true })
  @Authorized()
  signOut(@Ctx() { session }: Context): boolean {
    // Clear profile from session
    session.profileID = null

    return true
  }

  @Mutation(type => Profile)
  @Authorized()
  async changeUsername(
    @Args() { username }: SetUsernameArgs,
    @Ctx() { user }: Context
  ) {
    await this.profilesService.changeUsername(user.profileId, username)

    return await this.profilesService.get(user.profileId)
  }

  @Mutation(type => Boolean)
  @Authorized()
  async setNickname(
    @Args() { nickname, guest, guild }: SetNicknameArgs,
    @Ctx() { user }: Context
  ) {
    if (!guest) guest = user.profileId

    if (guest !== user.profileId) {
      // TODO: Trying to set nickname of other guest
      return false
    }

    await this.guildService.guests.setNickname(guild, guest, nickname)

    return true
  }
}
