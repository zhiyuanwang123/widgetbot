import config from '@lib/config'
import { crunch } from 'graphql-crunch'
import { Config } from 'apollo-server-core'
import { Service, Inject } from 'typedi'
import SessionStore from '@app/middlewares/session-store'
import autobind from 'autobind-decorator'
import { ConnectionContext } from 'subscriptions-transport-ws'
import WebSocket from 'ws'
import { Context } from './context'
import { ServerResponse } from 'http'

@Service('apollo')
@autobind
class Apollo {
  @Inject(type => SessionStore)
  private sessionStore: SessionStore

  private handleConnect(
    params: Object,
    ws: WebSocket,
    { request }: ConnectionContext
  ) {
    // Make express-session parse this request
    this.sessionStore.use(request as any, {} as any, () => {})
    const { session } = request as any

    return {
      session,
      params,
      ws,
      req: (ws as any).upgradeReq as Req
    }
  }

  public options: Config = {
    subscriptions: {
      path: '/api/graphql',
      onConnect: this.handleConnect
    },

    tracing: config.development,
    cacheControl: true,

    // formatError: error => {
    //   console.log(error)
    //   return new Error('Internal server error')
    // },
    // formatError: R.pipe(
    //   formatArgumentValidationError,
    //   formatError
    // ),
    context: ({
      connection,
      req
    }: {
      req: Req
      res: ServerResponse
      connection: any
    }): Context => {
      // Get the subscription, created earlier
      const subscription: ReturnType<Apollo['handleConnect']> =
        connection && connection.context

      // Capture req from subscription
      if (!req && subscription && subscription.req) req = subscription.req

      // Get the session either from the subscription, or from express
      const session =
        (subscription && subscription.session) || (req && req.session) || null
      const ws = (subscription && subscription.ws) || null

      const context = new Context(session, req, ws)
      return context
    },

    formatResponse(response, { request }) {
      if (
        response.data &&
        !response.data.__schema &&
        // Don't bother to parse the URL
        request.url.includes('crunch')
      ) {
        response.data = crunch(response.data)
      }

      return response
    },

    engine: {
      apiKey: 'service:widgetbot:lAjLqFCBbx5XVXDPEa6dcw',
      // @ts-ignore
      logging: {
        level: ['verbose', 'silly'].includes(config.log_level)
          ? 'DEBUG'
          : 'INFO'
      },
      origins: [
        {
          supportsBatch: true
        }
      ]
    },

    playground: {
      workspaceName: 'WidgetBot',
      settings: {
        'editor.fontFamily': `'Operator Mono', 'Source Code Pro', 'Consolas', 'Inconsolata', 'Droid Sans Mono', 'Monaco', monospace`,
        'general.betaUpdates': true,
        'request.credentials': 'include'
      }
    }
  }
}

export default Apollo
