import { Column, Entity } from '@services/Database'

@Entity()
class Connection {
  @Column() type: string

  @Column() data: any
}

export default Connection
