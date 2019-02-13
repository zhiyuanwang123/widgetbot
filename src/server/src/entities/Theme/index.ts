import { Field, ObjectType } from 'type-graphql'

import ThemeColors from './ThemeColors'

@ObjectType({ description: 'A Discord channel' })
class Theme {
  @Field({ description: 'Custom CSS for the server' })
  css: string

  @Field(type => ThemeColors, { description: 'Custom colors for the server' })
  colors: ThemeColors
}

export default Theme
