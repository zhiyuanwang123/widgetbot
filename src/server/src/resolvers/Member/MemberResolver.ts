import { Resolver, ResolverInterface, Root, FieldResolver } from 'type-graphql'
import Member from '@entities/Member'
import User from '@entities/User'
import typify from '@utils/typify'

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
}
