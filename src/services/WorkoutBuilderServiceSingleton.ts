import HIITWorkoutBuilderService from "./WorkoutBuilderService/HIITWorkoutBuilderService";
import TabataWorkoutBuilderService from "./WorkoutBuilderService/TabataWorkoutBuilderService";
import WorkoutBuilderService from "./WorkoutBuilderService/WorkoutBuilderService";
import { WorkoutType } from "../interfaces/WorkoutType";

WorkoutBuilderServiceSingleton.workoutBuilderService = new WorkoutBuilderService();
// @ts-ignore
WorkoutBuilderServiceSingleton.workoutType = null;

export default function WorkoutBuilderServiceSingleton (workoutType: WorkoutType): WorkoutBuilderService {
  if (WorkoutBuilderServiceSingleton.workoutType !== workoutType) {
    WorkoutBuilderServiceSingleton.workoutType = workoutType;

    switch(WorkoutBuilderServiceSingleton.workoutType) {
    case WorkoutType.HIIT:
      WorkoutBuilderServiceSingleton.workoutBuilderService = new HIITWorkoutBuilderService();
      break;
    case WorkoutType.Tabata:
      WorkoutBuilderServiceSingleton.workoutBuilderService = new TabataWorkoutBuilderService();
      break;
    default:
      throw new Error("Not supported workout type");
    }
  }

  return WorkoutBuilderServiceSingleton.workoutBuilderService;
}