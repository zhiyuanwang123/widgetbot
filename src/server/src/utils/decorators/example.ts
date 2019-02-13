import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments
} from 'class-validator'

export const isSnowflake = value =>
  typeof value === 'string' && !isNaN(+value) && +value < 9223372036854775807

const IsSnowflake = (validationOptions?: ValidationOptions) => (
  object: Object,
  propertyName: string
) =>
  registerDecorator({
    name: 'isSnowflake',
    target: object.constructor,
    propertyName: propertyName,
    options: validationOptions,
    validator: {
      validate: isSnowflake,
      defaultMessage: () => 'Invalid snowflake'
    }
  })

export default IsSnowflake
