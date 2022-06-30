import IRound from "../models/Round/IRound";
import { IWorkoutSettings } from "./IWorkoutSettings";

export default interface IWorkoutSession extends IWorkoutSettings {
  includeCardio: boolean;
  rounds: IRound[];
}