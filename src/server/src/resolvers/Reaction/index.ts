import { Resolver, FieldResolver, Root } from 'type-graphql'
import { Reaction } from '@entities/Message'
import EmojiResolver from '@resolvers/Emoji'

@Resolver(of => Reaction)
class ReactionResolver {
  @FieldResolver()
  emoji(@Root() root) {
    return EmojiResolver.resolve(root.emoji)
  }
}

export default ReactionResolver
