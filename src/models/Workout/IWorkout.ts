import WorkoutBuilder from "../WorkoutBuilder/WorkoutBuilder";
import WorkoutSession from "../WorkoutSession/WorkoutSession";
import {WorkoutSessionFields} from "../WorkoutSession/WorkoutSessionFields";
import IWorkoutSessionForState from "../WorkoutSession/IWorkoutSessionForState";

export default interface IWorkout {
  workoutBuilder: WorkoutBuilder;
  workoutSession: WorkoutSession;

  generateWorkoutSession(): void;
  updateWorkoutSessionValue(field: WorkoutSessionFields, value: any): void;
  getWorkoutSessionValues(): IWorkoutSessionForState;
}