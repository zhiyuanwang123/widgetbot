import { Field, ObjectType } from 'type-graphql'
import { Snowflake } from '@utils/scalars'

@ObjectType()
class Activity {
  @Field() name: string
  @Field() streaming: boolean
  @Field() type: string
  @Field() state: string
  @Field() details: string
  @Field() url: string

  @Field(type => Snowflake)
  applicationID: string
}

export default Activity
