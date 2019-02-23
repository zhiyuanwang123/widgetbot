import { ObjectType, Field } from 'type-graphql'
import { IMember } from '@entities/IMember'
import Profile from '@entities/Profile'
import User from '@entities/User'

@ObjectType({ implements: IMember })
export class GuestMember extends IMember {
  @Field(type => User, { nullable: true })
  user?: User

  @Field(type => Profile)
  profile: Profile

  @Field({ nullable: true })
  nickname?: string
}
