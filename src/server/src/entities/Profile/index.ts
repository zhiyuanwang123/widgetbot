import {
  Column,
  ColumnRef,
  Default,
  Entity,
  Ref,
  Unique
} from '@services/Database'
import Connection from '@models/Connection'
import { ObjectType, Field } from 'type-graphql'

@Entity()
@ObjectType()
class Profile {
  @Column()
  @Field()
  username: string

  @Column()
  @Field()
  avatarURL: string

  @Field() id: string

  // @Column()
  // @Default(false)
  // isAdmin?: boolean

  @ColumnRef(type => [Connection])
  connections: Ref<Connection>[]

  @Column({ nullable: true })
  email?: string
}

export default Profile
export * from './args'
