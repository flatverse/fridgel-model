import { Referencable } from "../Ref";

export const PersonType = "Person"

export interface Person extends Referencable<typeof PersonType> {
  first: string
  last: string
  alias?: string
  email?: string
}
