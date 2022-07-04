import { WorkoutType } from "../interfaces/WorkoutType";
import WorkoutBuilderService from "./WorkoutBuilderService/WorkoutBuilderService";
import HIITWorkoutBuilderService from "./WorkoutBuilderService/HIITWorkoutBuilderService";
import TabataWorkoutBuilderService from "./WorkoutBuilderService/TabataWorkoutBuilderService";

export default class WorkoutBuilder {
  public getWorkoutBuilderService(workoutType: WorkoutType): WorkoutBuilderService {
    switch(workoutType) {
    case WorkoutType.HIIT:
      return new HIITWorkoutBuilderService();
    case WorkoutType.Tabata:
      return new TabataWorkoutBuilderService();
    default:
      throw new Error("Not supported workout type");
    }
  }
}