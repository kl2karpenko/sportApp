import IWorkout from "./IWorkout";
import IWorkoutSessionForState from "../WorkoutSession/IWorkoutSessionForState";
import IWorkoutSession from "../WorkoutSession/IWorkoutSession";
import { WorkoutSessionFields } from "../WorkoutSession/WorkoutSessionFields";
import { IWorkoutBuilder } from "../WorkoutBuilder/IWorkoutBuilder";

export default abstract class BasicWorkout implements IWorkout {
  abstract workoutBuilder: IWorkoutBuilder;
  abstract workoutSession: IWorkoutSession;

  abstract updateWorkoutSessionValue(field: WorkoutSessionFields, value: any): void;

  getWorkoutSessionValues(): IWorkoutSessionForState {
    return this.workoutSession.getValues();
  }

  abstract generateWorkoutSession(): void;
}