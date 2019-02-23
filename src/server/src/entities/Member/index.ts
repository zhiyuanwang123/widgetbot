import { ObjectType, Field } from 'type-graphql'
import { IMember } from '@entities/IMember'
import User from '@entities/User'

@ObjectType({ implements: IMember })
class Member extends IMember {
  @Field(type => User, { nullable: true })
  user?: User
}

export default Member
