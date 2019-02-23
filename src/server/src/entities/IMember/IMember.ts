import { InterfaceType, Field } from 'type-graphql'
import User from '@entities/User'

@InterfaceType()
export class IMember {
  @Field() displayName: string
  @Field() avatarURL: string

  @Field(type => User, { nullable: true })
  user?: User

  @Field({ nullable: true })
  displayHexColor?: string
}
