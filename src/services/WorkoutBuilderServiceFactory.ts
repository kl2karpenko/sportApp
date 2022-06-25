import HIITWorkoutBuilderService from "./WorkoutBuilderService/HIITWorkoutBuilderService";
import TabataWorkoutBuilderService from "./WorkoutBuilderService/TabataWorkoutBuilderService";
import WorkoutBuilderService from "./WorkoutBuilderService/WorkoutBuilderService";

import { IWorkoutSettings } from "../interfaces_deprecated/IWorkoutSettings";
import { WorkoutType } from "../interfaces/WorkoutType";

export default function WorkoutBuilderServiceFactory (workoutType: WorkoutType, workoutDefaultSettings: IWorkoutSettings): WorkoutBuilderService {
  switch(workoutType) {
  case WorkoutType.HIIT:
    return new HIITWorkoutBuilderService(workoutDefaultSettings);
  case WorkoutType.Tabata:
    return new TabataWorkoutBuilderService(workoutDefaultSettings);
  default:
    throw new Error("Not supported workout type");
  }
}