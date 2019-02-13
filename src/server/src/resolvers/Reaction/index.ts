import { Resolver, FieldResolver, Root } from 'type-graphql'
import { Reaction } from '@entities/Message'
import { EmojiResolver } from '@resolvers'

@Resolver(of => Reaction)
export class ReactionResolver {
  @FieldResolver()
  emoji(@Root() root) {
    return EmojiResolver.resolve(root.emoji)
  }
}
