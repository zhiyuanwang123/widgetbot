import { Resolver, ResolverInterface, FieldResolver, Root } from 'type-graphql'
import { TextEmoji, CustomEmoji } from '@entities/Emoji'

@Resolver(of => TextEmoji)
export class TextEmojiResolver implements ResolverInterface<TextEmoji> {
  @FieldResolver()
  utf8(@Root() root) {
    return root.name
  }

  @FieldResolver()
  name(@Root() root): string {
    return 'not implemented yet'
  }
}
