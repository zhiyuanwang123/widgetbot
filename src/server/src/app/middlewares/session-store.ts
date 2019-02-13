import connectMongo from 'connect-mongo'
import session from 'express-session'
import mongoose from 'mongoose'
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers'

const MongoStore = connectMongo(session)

@Middleware({ type: 'before' })
class SessionStore implements ExpressMiddlewareInterface {
  public store = new MongoStore({
    mongooseConnection: mongoose.connection
  })

  public use = session({
    secret: 'asd',
    store: this.store,
    resave: false,
    saveUninitialized: false,
    name: 'widgetbot.token'
  })
}

export default SessionStore
