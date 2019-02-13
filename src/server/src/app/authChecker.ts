import { AuthChecker } from 'type-graphql'

const authChecker: AuthChecker<Context> = (
  { root, args, context: { user }, info },
  roles: Array<string | boolean>
) => {
  const signedIn = !!user.id

  // Deny access if they're signed in
  if (roles.includes(false)) return !signedIn

  // here you can read user from context
  // and check his permission in db against `roles` argument
  // that comes from `@Authorized`, eg. ["ADMIN", "MODERATOR"]

  return signedIn
}

export default authChecker
