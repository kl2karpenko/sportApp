import IExercise from "../../models/Exercise/IExercise";
import { WorkoutAlgorithms } from "./WorkoutAlgorithms";
import WorkoutExercisesGeneratorService from "./WorkoutExercisesGeneratorService";

export default class HIITWorkoutExercisesGeneratorService extends WorkoutExercisesGeneratorService {
  public getExercisesList(algorithm?: WorkoutAlgorithms, includeCardio: boolean = true): IExercise[] {
    switch (algorithm) {
    default:
      return [];
    }
  }
}