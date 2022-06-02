import IWorkoutSession from "./IWorkoutSession";
import {WorkoutSessionFields} from "./WorkoutSessionFields";
import IRound from "../../models/Round/IRound";

export default interface IWorkoutSessionService extends IWorkoutSession {
  getRoundByIndex(index: number): IRound;
  getValues(): IWorkoutSession;
  updateValue(field: WorkoutSessionFields, value: any): void;
  getValue(field: WorkoutSessionFields): any;
}