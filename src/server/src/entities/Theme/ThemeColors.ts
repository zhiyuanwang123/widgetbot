import { Field, ObjectType } from 'type-graphql'

@ObjectType({ description: 'A Discord channel' })
class ThemeColors {
  @Field({ description: 'Primary theme color (font color)' })
  primary: string

  @Field({ description: 'Accent color (buttons)' })
  accent: string

  @Field({ description: 'Background color' })
  background: string
}

export default ThemeColors
