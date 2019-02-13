import { Resolver, FieldResolver, Root } from 'type-graphql'
import { TextMessage } from '@entities/Message'
import EmojiResolver from '@resolvers/Emoji'

@Resolver(of => TextMessage)
class TextMessageResolver {
  @FieldResolver()
  reactions(@Root() root) {
    const reactions = root.reactions.array()
    const resolved = reactions.map(EmojiResolver.resolve)

    return resolved
  }
}

export default TextMessageResolver
