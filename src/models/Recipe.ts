import { Ref, Referencable } from "../Ref";
import { Tag } from "./Tag";

export const RecipeType = "Recipe"

export interface Recipe extends Referencable<typeof RecipeType> {
  name: string
  description?: string
  tags: Ref<Tag>[]
}
