import { ArgsType, Field } from 'type-graphql'
import { IsIn } from 'class-validator'

@ArgsType()
export class AvatarOptions {
  @Field({ nullable: true })
  @IsIn(['webp', 'png', 'jpg', 'gif'])
  format?: string

  @Field({ nullable: true })
  @IsIn([128, 256, 512, 1024, 2048])
  size?: number
}
