import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'

// const CRUNCH = false

// const uncruncher = new ApolloLink((operation, forward) =>
//   forward(operation).map(response => {
//     response.data = uncrunch(response.data)
//     return response
//   })
// )

const httpLink = ApolloLink.from([
  onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
        console.error(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      )
    if (networkError) console.error(`[Network error]: ${networkError}`)
  }),
  // CRUNCH && uncruncher,
  new HttpLink({
    uri: `/api/graphql` /*${CRUNCH ? '?crunch' : ''}`*/
  })
].filter(Boolean) as any)

export default httpLink
