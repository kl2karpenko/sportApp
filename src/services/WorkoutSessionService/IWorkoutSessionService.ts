import IRound from "../../models/Round/IRound";
import { WorkoutSessionFields } from "./WorkoutSessionFields";
import { TValues } from "../../interfaces_deprecated/TValues";
import { BodyParts } from "../../data/bodyPartsForWorkout";
import IWorkoutSession from "./IWorkoutSession";

export default interface IWorkoutSessionService extends IWorkoutSession {
  getRoundByIndex(index: number): IRound;
  setActiveRoundIndex(index: number): void;
  updateValue(field: WorkoutSessionFields, value: any): void;
  getValues(): IWorkoutSession;
  getValue(field: WorkoutSessionFields): any;
}