import { Model } from "../Model";
import { Time } from "./Time";

export const WeeklyRecurrenceScheduleType = "WeeklyRecurrenceSchedule"

export enum DayOfWeek {
  SUNDAY= 0,
  MONDAY= 1,
  TUESDAY= 2,
  WEDNESDAY= 3,
  THURSDAY = 4,
  FRIDAY = 5,
  SATURDAY = 6
}

export enum WeekOfMonth {
  FIRST = 1,
  SECOND = 2,
  THIRD = 3,
  FOURTH = 4,
  LAST = 5 // fourth OR fifth week of month (February has exactly 4 weeks)
}

export interface WeeklyRecurrenceSchedule extends Model<typeof WeeklyRecurrenceScheduleType> {
  startingAfter: Date
  numberOfRecurrences?: number

  /** @prop {Time} time of day */
  time: Time

  /** @prop {DayOfWeek} dayOfWeek which days of the week does this recurrence happen on */
  dayOfWeek: DayOfWeek

  /** @prop {number} everyWeeks recurs every X weeks if defined */
  everyWeeks?: number

  // behavior should be "AND" if both defined

  /** @prop {WeekOfMonth[]} weeksOfMonth recurs on the X week of the month, if any */
  weeksOfMonth: WeekOfMonth[]
}
