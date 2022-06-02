import IExercise from "../../models/Exercise/IExercise";
import { WorkoutAlgorithms } from "./WorkoutAlgorithms";
import { IWorkoutRoundExercises } from "../../models/WorkoutRoundExercises/IWorkoutRoundExercises";

export interface IWorkoutExercisesGeneratorService {
  workoutRoundExercises: IWorkoutRoundExercises;

  getExercisesList(algorithm: WorkoutAlgorithms): Set<IExercise>;
}