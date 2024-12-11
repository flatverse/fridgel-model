import { Referencable } from "../Ref";
import { Attendee } from "./Attendee";
import { WeeklyRecurrenceSchedule } from "./WeeklyRecurrenceSchedule";

export const MealType = "Meal"

export interface Meal extends Referencable<typeof MealType> {
  schedule: WeeklyRecurrenceSchedule[]
  attendees: Attendee[]
}
