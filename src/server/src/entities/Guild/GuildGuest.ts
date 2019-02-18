import { Field, ObjectType } from 'type-graphql'
import Profile from '@entities/Profile'

@ObjectType()
export class GuildGuest {
  @Field(type => Profile)
  profile: Profile

  @Field({ nullable: true })
  nickname?: string

  @Field({ nullable: true })
  displayName: string
}
