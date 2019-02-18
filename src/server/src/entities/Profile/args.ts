import { MinLength, MaxLength } from 'class-validator'
import { ArgsType, Field, ID } from 'type-graphql'
import { Snowflake } from '@utils/scalars'

const MIN_NAME_LENGTH = 4
const MAX_NAME_LENGTH = 15

@ArgsType()
export class SignUpArgs {
  @Field({ nullable: true })
  @MinLength(MIN_NAME_LENGTH)
  @MaxLength(MAX_NAME_LENGTH)
  username?: string
}

@ArgsType()
export class SetUsernameArgs {
  @Field()
  @MinLength(MIN_NAME_LENGTH)
  @MaxLength(MAX_NAME_LENGTH)
  username: string
}

@ArgsType()
export class SetNicknameArgs {
  @Field(type => Snowflake)
  guild: string

  @Field({ nullable: true })
  @MinLength(MIN_NAME_LENGTH)
  @MaxLength(MAX_NAME_LENGTH)
  nickname?: string

  @Field(type => ID, { nullable: true })
  guest?: string
}
