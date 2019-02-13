import { arrayProp, prop } from 'typegoose'

interface IColumnOptions {
  nullable?: boolean
  index?: boolean
  unique?: boolean
}

export const Column = (
  __type?: IColumnOptions | ((type?) => [Constructable] | Constructable),
  __options?: IColumnOptions,
  isRef = false
) => {
  const resolvedType = __type instanceof Function && __type()
  const isArray = resolvedType instanceof Array
  const type = isArray ? resolvedType[0] : resolvedType

  const options = (__type instanceof Function ? __options : __type) || {}

  const inferredOptions = {
    required: !options.nullable,
    index: options.index,
    unique: options.unique
  }

  return isArray
    ? arrayProp({
        ...inferredOptions,
        [isRef ? 'itemsRef' : 'items']: type
      })
    : prop(inferredOptions)
}

export const ColumnRef = ((a, b) => Column(a, b, true)) as typeof Column
