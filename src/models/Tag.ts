import { Referencable } from "../Ref";

export const TagType = "Tag"

export interface Tag extends Referencable<typeof TagType> {
  name: string
  description?: string
}
