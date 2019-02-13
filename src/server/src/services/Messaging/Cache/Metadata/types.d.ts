type UserType = 'guest' | 'member'

type Name = string
type ID = string
type Avatar = string

export type IMetadataStorage = [Name, ID, UserType, Avatar]

export interface IMetadata {
  name?: Name
  type?: UserType

  id?: ID
  avatar?: Avatar
}
