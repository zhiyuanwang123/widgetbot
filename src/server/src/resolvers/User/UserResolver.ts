import {
  Resolver,
  ResolverInterface,
  FieldResolver,
  Root,
  Args
} from 'type-graphql'
import User from '@entities/User'
import { AvatarOptions } from '@entities/AvatarOptions'

@Resolver(of => User)
export class UserResolver implements ResolverInterface<User> {
  @FieldResolver()
  avatarURL(@Root() user, @Args() options: AvatarOptions) {
    return user.avatarURL(options)
  }
}
