import IRound from "../Round/IRound";
import { WorkoutSessionFields } from "./WorkoutSessionFields";
import { TValues } from "../../interfaces/TValues";
import { BodyParts } from "../../data/bodyPartsForWorkout";
import IWorkoutSessionForState from "./IWorkoutSessionForState";

export default interface IWorkoutSession extends IWorkoutSessionForState {
  getRoundByIndex(index: number): IRound;
  setActiveRoundIndex(index: number): void;
  updateValue(field: WorkoutSessionFields, value: any): void;
  getValues(): IWorkoutSessionForState;
  getValue(field: WorkoutSessionFields): any;
}