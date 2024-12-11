import { Model } from "../Model";

export const RSVPType = "RSVP"

export type RSVPResponse = "YES"|"NO"|"MAYBE"

export interface RSVP extends Model<typeof RSVPType> {
  response?: RSVPResponse

  /** @prop {number[]} except the recurrence number that this person will not be attending */
  except: {response:RSVPResponse,recurrence:number}[]
}
