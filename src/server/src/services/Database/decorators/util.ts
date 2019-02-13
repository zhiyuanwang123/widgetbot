import { prop } from 'typegoose'

export const Validate = (options: {
  max?: number
  min?: number
  maxlength?: number
  minlength?: number
  match?: RegExp
}) => prop(options)

export const Default = <T = any>(value: T) => prop({ default: value })
export const Unique = () => prop({ unique: true })
export const Index = (options: { sparse?: boolean }) =>
  prop({ index: true, ...options })

// export const Match = (match: RegExp) => prop({ match })

// export const Max = (max: number) => prop({ max })
// export const Min = (min: number) => prop({ min })

// export const MaxLength = (maxlength: number) => prop({ maxlength })
// export const MinLength = (minlength: number) => prop({ minlength })
