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

@Resolver(of => Profile)
class ProfileResolver /*implements ResolverInterface<Profile>*/ {
  @Inject() private profilesService: ProfilesService

  @Inject() private guildService: GuildService

  @FieldResolver()
  id(@Ctx() { user }: Context): string {
    return user.id
  }

  @Query(type => Profile, { nullable: true })
  async me(@Ctx() { user, session }: Context) {
    // Not signed in
    if (!user.id) return null

    const profile = await user.getProfile()

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
  async setUsername(
    @Args() { username }: SetUsernameArgs,
    @Ctx() { user }: Context
  ) {
    await this.profilesService.setUsername(user.id, username)

    const profile = await user.getProfile()
    return profile
  }

  @Mutation(type => Boolean)
  @Authorized()
  async setNickname(
    @Args() { nickname, guest, guild }: SetNicknameArgs,
    @Ctx() { user }: Context
  ) {
    if (!guest) guest = user.id

    if (guest !== user.id) {
      // TODO: Trying to set nickname of other guest
      return false
    }

    await this.guildService.guests.setNickname(guild, guest, nickname)

    return true
  }
}

export default ProfileResolver
