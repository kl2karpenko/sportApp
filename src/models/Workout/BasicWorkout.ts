import IWorkout from "./IWorkout";
import WorkoutBuilder from "../WorkoutBuilder/WorkoutBuilder";
import WorkoutSession from "../WorkoutSession/WorkoutSession";
import { WorkoutSessionFields } from "../WorkoutSession/WorkoutSessionFields";
import IWorkoutSessionForState from "../WorkoutSession/IWorkoutSessionForState";

export default abstract class BasicWorkout implements IWorkout {
  abstract workoutBuilder: WorkoutBuilder;
  abstract workoutSession: WorkoutSession;

  abstract generateWorkoutSession(): void;

  abstract updateWorkoutSessionValue(field: WorkoutSessionFields, value: any): void;
  abstract getWorkoutSessionValue(): IWorkoutSessionForState;
}