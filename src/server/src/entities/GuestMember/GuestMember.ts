import { ObjectType, Field } from 'type-graphql'
import { IMember } from '@entities/IMember'
import Profile from '@entities/Profile'

@ObjectType({ implements: IMember })
export class GuestMember extends IMember {
  @Field(type => Profile)
  profile: Profile

  @Field({ nullable: true })
  nickname?: string
}
