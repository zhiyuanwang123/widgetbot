import { ObjectType, Field } from 'type-graphql'

@ObjectType()
class Profile {
  @Field() username: string
  @Field({ nullable: true })
  avatarURL?: string
  @Field() id: string
}

export default Profile
export * from './args'
