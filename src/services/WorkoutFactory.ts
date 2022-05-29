import HIITWorkoutService from "./WorkoutService/HIITWorkoutService";
import TabataWorkoutService from "./WorkoutService/TabataWorkoutService";
import BasicWorkoutService from "./WorkoutService/BasicWorkoutService";

import { IWorkoutSettings } from "../interfaces_deprecated/IWorkoutSettings";
import { WorkoutType } from "../interfaces_deprecated/WorkoutType";

export default class WorkoutFactory {
  getWorkout(workoutType: WorkoutType, workoutDefaultSettings: IWorkoutSettings): BasicWorkoutService {
    switch(workoutType) {
    case WorkoutType.HIIT:
      return new HIITWorkoutService(workoutDefaultSettings);
    case WorkoutType.Tabata:
      return new TabataWorkoutService(workoutDefaultSettings);
    default:
      throw new Error("Not supported workout type");
    }
  }
}