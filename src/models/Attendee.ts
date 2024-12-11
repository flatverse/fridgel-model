import { Model } from "../Model";
import { Ref } from "../Ref";
import { Person } from "./Person";
import { RSVPResponse } from "./RSVP";

export const AttendeeType = "Attendee"

export interface Attendee extends Model<typeof AttendeeType> {
  person: Ref<Person>
  rsvp: RSVPResponse
}
