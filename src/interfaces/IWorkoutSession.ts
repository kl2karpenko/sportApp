import IRound from "../models/Round/IRound";
import { IWorkoutSettings } from "./IWorkoutSettings";

export default interface IWorkoutSession extends IWorkoutSettings {
  onlyCardio: boolean;
  includeCardio: boolean;
  rounds: Partial<IRound>[];
}