import {
  Resolver,
  FieldResolver,
  Root,
  ResolverInterface,
  Mutation,
  ArgsType,
  Field,
  ID,
  Args
} from 'type-graphql'
import { GuildBan } from '@entities/Guild'
import ProfilesService from '@services/Profiles'
import { Inject } from 'typedi'
import { Snowflake } from '@utils/scalars'
import GuildService from '@services/Guild'

@ArgsType()
export class GuildBanArgs {
  @Field(type => Snowflake)
  guild: string

  @Field(type => ID, { nullable: true })
  profileId?: string

  @Field({ nullable: true })
  ip?: string
}

@Resolver(of => GuildBan)
export class GuildBanResolver implements ResolverInterface<GuildBan> {
  @Inject() private guildService: GuildService
  @Inject() private profilesService: ProfilesService

  @FieldResolver()
  async profile(@Root() ban) {
    if (!ban.profile) return null

    return await this.profilesService.get(ban.profile.id)
  }

  @Mutation(type => GuildBan)
  async banGuest(@Args() { guild, profileId, ip }: GuildBanArgs) {
    return await this.guildService.bans.add(guild, { profileId, ip })
  }

  @Mutation(type => Boolean)
  async unbanGuest(@Args() { guild, profileId, ip }: GuildBanArgs) {
    await this.guildService.bans.remove(guild, { profileId, ip })

    return true
  }
}
