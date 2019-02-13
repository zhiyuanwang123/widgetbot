import { EventEmitter } from 'events'
import { Service } from 'typedi'

@Service()
class ServerAPI extends EventEmitter {}

export default ServerAPI
