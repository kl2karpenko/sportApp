import HIITWorkout from "./Workout/HIITWorkout";
import TabataWorkout from "./Workout/TabataWorkout";
import BasicWorkout from "./Workout/BasicWorkout";

import { IWorkoutSettings } from "../interfaces/IWorkoutSettings";
import { WorkoutType } from "../interfaces/WorkoutType";

export default class WorkoutFactory {
  getWorkout(workoutType: WorkoutType, workoutDefaultSettings: IWorkoutSettings): BasicWorkout {
    switch(workoutType) {
    case WorkoutType.HIIT:
      return new HIITWorkout(workoutDefaultSettings);
    case WorkoutType.Tabata:
      return new TabataWorkout(workoutDefaultSettings);
    default:
      throw new Error("Not supported workout type");
    }
  }
}