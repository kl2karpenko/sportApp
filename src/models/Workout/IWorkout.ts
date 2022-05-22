import WorkoutBuilder from "../../builders/Workout/WorkoutBuilder";
import WorkoutSession from "../WorkoutSession/WorkoutSession";
import {WorkoutSessionFields} from "../WorkoutSession/WorkoutSessionFields";

export default interface IWorkout {
  workoutBuilder: WorkoutBuilder;
  workoutSession: WorkoutSession;

  generateWorkoutSession(): void;
  updateWorkoutSessionValue(field: WorkoutSessionFields, value: any): void;
}