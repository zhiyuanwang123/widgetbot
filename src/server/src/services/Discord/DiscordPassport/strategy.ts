import OAuth2Strategy, {
  InternalOAuthError,
  StrategyOptions
} from 'passport-oauth2'

export default class Strategy extends OAuth2Strategy {
  constructor(customOps: Partial<StrategyOptions>, verify?) {
    const options = {
      ...customOps,
      authorizationURL: 'https://discordapp.com/api/oauth2/authorize',
      tokenURL: 'https://discordapp.com/api/oauth2/token'
    } as StrategyOptions

    super(options, verify)
    this.name = 'discord'
    this._oauth2.useAuthorizationHeaderforGET(true)
  }

  /**
   * Retrieve user profile from Discord.
   *
   * This function constructs a normalized profile.
   * Along with the properties returned from /users/@me, properties returned include:
   *   - `connections`      Connections data if you requested this scope
   *   - `guilds`           Guilds data if you requested this scope
   *   - `fetchedAt`        When the data was fetched as a `Date`
   *   - `accessToken`      The access token used to fetch the (may be useful for refresh)
   *
   * @param {string} accessToken
   * @param {function} done
   * @access protected
   */
  userProfile(accessToken, done) {
    const self = this

    this._oauth2.get(
      'https://discordapp.com/api/users/@me',
      accessToken,
      // @ts-ignore
      (err, body, res) => {
        if (err) {
          return done(
            new InternalOAuthError('Failed to fetch the user profile.', err)
          )
        }

        try {
          var parsedData = JSON.parse(body)
        } catch (e) {
          return done(new Error('Failed to parse the user profile.'))
        }

        const profile = parsedData // has the basic user stuff
        profile.provider = 'discord'
        profile.accessToken = accessToken

        self.checkScope('connections', accessToken, (errx, connections) => {
          if (errx) done(errx)
          if (connections) profile.connections = connections
          self.checkScope('guilds', accessToken, (erry, guilds) => {
            if (erry) done(erry)
            if (guilds) profile.guilds = guilds

            profile.fetchedAt = new Date()
            return done(null, profile)
          })
        })
      }
    )
  }

  checkScope(scope, accessToken, cb) {
    const { _scope } = this as any

    if (_scope && _scope.includes(scope)) {
      this._oauth2.get(
        `https://discordapp.com/api/users/@me/${scope}`,
        accessToken,
        // @ts-ignore
        (err, body, res) => {
          if (err)
            return cb(
              new InternalOAuthError(`Failed to fetch user's ${scope}`, err)
            )
          try {
            var json = JSON.parse(body)
          } catch (e) {
            return cb(new Error(`Failed to parse user's ${scope}`))
          }
          cb(null, json)
        }
      )
    } else {
      cb(null, null)
    }
  }

  /**
   * Return extra parameters to be included in the authorization request.
   *
   * @param {Object} options
   * @return {Object}
   * @api protected
   */
  authorizationParams({ permissions }) {
    const params = {
      ...(typeof permissions !== 'undefined' && { permissions })
    }
    return params
  }
}
