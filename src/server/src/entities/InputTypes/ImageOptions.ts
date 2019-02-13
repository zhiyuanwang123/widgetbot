import { Field, ArgsType } from 'type-graphql'

@ArgsType()
export default class ImageOptions {
  @Field({ nullable: true })
  format?: string

  @Field({ nullable: true })
  size?: number
}
