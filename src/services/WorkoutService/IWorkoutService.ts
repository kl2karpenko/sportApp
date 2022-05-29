import WorkoutBuilderService from "../WorkoutBuilderService/WorkoutBuilderService";
import WorkoutSessionService from "../WorkoutSessionService/WorkoutSessionService";
import {WorkoutSessionFields} from "../WorkoutSessionService/WorkoutSessionFields";
import IWorkoutSession from "../WorkoutSessionService/IWorkoutSession";

export default interface IWorkoutService {
  workoutBuilder: WorkoutBuilderService;
  workoutSession: WorkoutSessionService;

  generateWorkoutSession(): void;
  updateWorkoutSessionValue(field: WorkoutSessionFields, value: any): void;
  getWorkoutSessionValues(): IWorkoutSession;
}