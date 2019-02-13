import { Field, ObjectType } from 'type-graphql'
import { Column } from '@services/Database'

export type GuildBanType = 'id' | 'ip'
export type GuildBanData = string

@ObjectType()
export class GuildBan {
  @Field()
  @Column()
  type: GuildBanType

  @Field()
  @Column()
  data: GuildBanData
}
