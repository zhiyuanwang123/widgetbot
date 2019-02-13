import { Field, ObjectType } from 'type-graphql'

import Activity from './Activity'

@ObjectType()
class Presence {
  @Field({ nullable: true })
  activity?: Activity

  @Field() status: string
}

export default Presence
