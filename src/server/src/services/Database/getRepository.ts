import aggregate from '@utils/aggregator'
import * as Mongoose from 'mongoose'
import { Typegoose } from 'typegoose'

const cache = new WeakMap()

export type Document<T extends Constructable<any>> = InstanceType<T>
export type DocResult<T extends Constructable<any>> = Mongoose.Document &
  Document<T>

export const getRepository = <T extends Constructable<any>>(entity: T) => {
  type document = Document<T>
  type docResult = DocResult<T>

  // Override typegoose bad types
  type CorrectedTypes = {
    new (doc: document): docResult
    create(doc: Partial<document>): Promise<docResult>
    create(...docs: Partial<document>[]): Promise<docResult[]>
    findById(id: string): Promise<docResult>
  }

  type IModel = Omit<Mongoose.Model<document>, keyof CorrectedTypes | 'new'> &
    CorrectedTypes
  type Model = IModel & Typegoose & T

  if (cache.has(entity)) return cache.get(entity) as Model

  const Entity = aggregate(entity.name, entity, Typegoose)
  const Model = new Entity().getModelForClass(Entity) as Model
  cache.set(entity, Model)

  return Model
}
