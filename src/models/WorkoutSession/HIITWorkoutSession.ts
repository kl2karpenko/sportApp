import WorkoutSession from "./WorkoutSession";
import { WorkoutSessionFields } from "./WorkoutSessionFields";

export default class HIITWorkoutSession extends WorkoutSession {
  updateValue(field: WorkoutSessionFields, value: number): void {
    console.log(field, " field", value);
    this[field] = value;
  }
}