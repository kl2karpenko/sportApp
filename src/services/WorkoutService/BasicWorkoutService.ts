import IWorkoutService from "./IWorkoutService";
import IWorkoutSession from "../WorkoutSessionService/IWorkoutSession";
import IWorkoutSessionService from "../WorkoutSessionService/IWorkoutSessionService";
import { WorkoutSessionFields } from "../WorkoutSessionService/WorkoutSessionFields";
import { IWorkoutBuilderService } from "../WorkoutBuilderService/IWorkoutBuilderService";

export default abstract class BasicWorkoutService implements IWorkoutService {
  abstract workoutBuilder: IWorkoutBuilderService;
  abstract workoutSession: IWorkoutSessionService;

  abstract updateWorkoutSessionValue(field: WorkoutSessionFields, value: any): void;

  getWorkoutSessionValues(): IWorkoutSession {
    return this.workoutSession.getValues();
  }

  abstract generateWorkoutSession(): void;
}