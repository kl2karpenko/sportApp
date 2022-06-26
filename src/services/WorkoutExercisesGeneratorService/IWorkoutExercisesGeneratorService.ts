import IExercise from "../../models/Exercise/IExercise";
import { WorkoutAlgorithms } from "./WorkoutAlgorithms";

export interface IWorkoutExercisesGeneratorService {
  getExercisesList(algorithm: WorkoutAlgorithms): IExercise[];
}