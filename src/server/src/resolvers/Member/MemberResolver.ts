import {
  Resolver,
  ResolverInterface,
  Root,
  FieldResolver,
  Args
} from 'type-graphql'
import Member from '@entities/Member'
import User from '@entities/User'
import typify from '@utils/typify'
import { AvatarOptions } from '@entities/AvatarOptions'

@Resolver(of => Member)
export class MemberResolver implements ResolverInterface<Member> {
  @FieldResolver(type => User)
  user(@Root() member) {
    return typify(User, member.user)
  }

  @FieldResolver()
  displayName(@Root() member: Member): string {
    return member.user ? member.user.username : 'Discord user'
  }

  @FieldResolver(type => String)
  avatarURL(@Root() member, @Args() options: AvatarOptions) {
    return member.avatarURL(options)
  }
}
