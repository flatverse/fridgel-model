import { Model } from "./Model"

export const RefType = "Ref"

export interface Referencable<T extends string> extends Model<T> {
  id: string
}

export interface Ref<M extends Referencable<string>> {
  type: typeof RefType
  refType: M["type"]
  id?: string
}
