import { Field, ObjectType } from 'type-graphql'
import { Snowflake } from '@utils/scalars'
import { Column } from '@services/Database'

@ObjectType()
export class GuildGuest {
  @Field(type => Snowflake)
  @Column({ index: true })
  id: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  nickname?: string

  // @Field()
  // online: boolean
}
