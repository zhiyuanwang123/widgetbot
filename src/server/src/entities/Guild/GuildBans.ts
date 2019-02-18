import { Field, ObjectType } from 'type-graphql'
import Profile from '@entities/Profile'

@ObjectType()
export class GuildBan {
  @Field({ nullable: true })
  profile?: Profile
  @Field({ nullable: true })
  ip?: string
}
