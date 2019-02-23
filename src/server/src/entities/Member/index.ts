import { ObjectType, Field } from 'type-graphql'
import { IMember } from '@entities/IMember'

@ObjectType({ implements: IMember })
class Member extends IMember {}

export default Member
