import { Model } from "../Model";

export const TimeType = "Time"

export interface Time extends Model<typeof TimeType> {
  hours: number // "int"
  minutes: number // "int"
  seconds: number // float
}
