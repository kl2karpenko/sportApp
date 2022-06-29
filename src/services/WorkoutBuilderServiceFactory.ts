import HIITWorkoutBuilderService from "./WorkoutBuilderService/HIITWorkoutBuilderService";
import TabataWorkoutBuilderService from "./WorkoutBuilderService/TabataWorkoutBuilderService";
import WorkoutBuilderService from "./WorkoutBuilderService/WorkoutBuilderService";

import { IWorkoutSettings } from "../interfaces/IWorkoutSettings";
import { WorkoutType } from "../interfaces/WorkoutType";

export default function WorkoutBuilderServiceFactory (workoutType: WorkoutType): WorkoutBuilderService {
  switch(workoutType) {
  case WorkoutType.HIIT:
    return new HIITWorkoutBuilderService({ workoutType });
  case WorkoutType.Tabata:
    return new TabataWorkoutBuilderService({ workoutType });
  default:
    throw new Error("Not supported workout type");
  }
}