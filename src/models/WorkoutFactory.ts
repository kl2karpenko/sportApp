import HIITWorkout from "./Workout/HIITWorkout";
import TabataWorkout from "./Workout/TabataWorkout";
import Workout from "./Workout/Workout";

import { IWorkoutSettings } from "../interfaces/IWorkoutSettings";
import { WorkoutType } from "../interfaces/WorkoutType";
import WorkoutSession from "./WorkoutSession/WorkoutSession";
import HIITWorkoutSession from "./WorkoutSession/HIITWorkoutSession";
import TabataWorkoutSession from "./WorkoutSession/TabataWorkoutSession";

export default class WorkoutFactory {
  getWorkout(workoutType: WorkoutType, workoutDefaultSettings: IWorkoutSettings): Workout {
    switch(workoutType) {
    case WorkoutType.HIIT:
      return new HIITWorkout(workoutDefaultSettings);
    case WorkoutType.Tabata:
      return new TabataWorkout(workoutDefaultSettings);
    default:
      throw new Error("Not supported workout type");
    }
  }

  getWorkoutSession(workoutType: WorkoutType, workoutDefaultSettings: IWorkoutSettings): WorkoutSession {
    switch(workoutType) {
    case WorkoutType.HIIT:
      return new HIITWorkoutSession(workoutDefaultSettings);
    case WorkoutType.Tabata:
      return new TabataWorkoutSession(workoutDefaultSettings);
    default:
      throw new Error("Not supported workout type");
    }
  }
}