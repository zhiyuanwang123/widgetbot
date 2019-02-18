import { ObjectType, Field } from 'type-graphql'

@ObjectType()
class Profile {
  @Field() id: string
  @Field() username: string
  @Field({ nullable: true })
  avatarURL?: string
}

export default Profile
export * from './args'
