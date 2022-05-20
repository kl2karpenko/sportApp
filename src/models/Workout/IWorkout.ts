import WorkoutBuilder from "../../builders/Workout/WorkoutBuilder";
import WorkoutSession from "../WorkoutSession/WorkoutSession";

export default interface IWorkout {
  workoutBuilder: WorkoutBuilder;
  workoutSession: WorkoutSession;

  generateWorkoutSession(): void;
}