import { ObjectType } from 'type-graphql'
import User from '@entities/User'

@ObjectType({ implements: User })
class Member extends User {}

export default Member
