import IWorkout from "./IWorkout";
import WorkoutBuilder from "../../builders/Workout/WorkoutBuilder";
import WorkoutSession from "../WorkoutSession/WorkoutSession";

export default abstract class Workout implements IWorkout {
  abstract workoutBuilder: WorkoutBuilder;
  abstract workoutSession: WorkoutSession;

  abstract generateWorkoutSession(): void;
}