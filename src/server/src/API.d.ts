interface Session {
  profileID?: string
}

type Context = import('@app').Context

type Req = import('http').IncomingMessage & { session: Session }
