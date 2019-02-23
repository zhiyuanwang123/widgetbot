import { ObjectType, Field } from 'type-graphql'
import User from '@entities/User'

@ObjectType()
class Profile {
  @Field() id: string
  @Field() username: string

  @Field({ nullable: true })
  avatarURL?: string

  @Field({ nullable: true })
  user?: User
}

export default Profile
export * from './args'
