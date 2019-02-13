export type ResolverInterface<ObjectType extends object, Root = ObjectType> = {
  [P in keyof ObjectType]?: (
    root: Root,
    ...args: any[]
  ) => ObjectType[P] | Promise<ObjectType[P]>
}
