import IExercise from "../../models/Exercise/IExercise";
import WorkoutExercisesGeneratorService from "./WorkoutExercisesGeneratorService";

export interface ITabataWorkoutGetExercisesListConfig { includeCardio: boolean; }

export default class HIITWorkoutExercisesGeneratorService extends WorkoutExercisesGeneratorService {
  public getExercisesList(props: ITabataWorkoutGetExercisesListConfig): IExercise[] {
    return [];
  }
}