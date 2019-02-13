import { ObjectType } from 'type-graphql'
import User from '@entities/User'

@ObjectType({ implements: User })
class GuestMember extends User {}

export default GuestMember
