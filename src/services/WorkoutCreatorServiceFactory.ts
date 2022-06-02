import HIITWorkoutCreatorService from "./WorkoutCreatorService/HIITWorkoutCreatorService";
import TabataWorkoutCreatorService from "./WorkoutCreatorService/TabataWorkoutCreatorService";
import WorkoutCreatorService from "./WorkoutCreatorService/WorkoutCreatorService";

import { IWorkoutSettings } from "../interfaces_deprecated/IWorkoutSettings";
import { WorkoutType } from "../interfaces_deprecated/WorkoutType";

export default function WorkoutCreatorServiceFactory (workoutType: WorkoutType, workoutDefaultSettings: IWorkoutSettings): WorkoutCreatorService {
  switch(workoutType) {
  case WorkoutType.HIIT:
    return new HIITWorkoutCreatorService(workoutDefaultSettings);
  case WorkoutType.Tabata:
    return new TabataWorkoutCreatorService(workoutDefaultSettings);
  default:
    throw new Error("Not supported workout type");
  }
}