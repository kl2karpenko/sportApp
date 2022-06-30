import IExercise from "../../models/Exercise/IExercise";
import { TValues } from "../../interfaces/TValues";
import { EBodyParts } from "../../data/bodyPartsForWorkout";
import { WorkoutAlgorithms } from "./WorkoutAlgorithms";
import { IExercisesList } from "../../models/ExercisesList/IExercisesList";
import ExercisesList from "../../models/ExercisesList/ExercisesList";
import { IHiitWorkoutGetExercisesListConfig } from "./HIITWorkoutExercisesGeneratorService";
import { ITabataWorkoutGetExercisesListConfig } from "./TabataWorkoutExercisesGeneratorService";

export interface IWorkoutGetExercisesListConfig extends IHiitWorkoutGetExercisesListConfig, ITabataWorkoutGetExercisesListConfig {

}

export default class WorkoutExercisesGeneratorService {
  protected listOfExercisesForCurrentBodyPart: IExercise[];
  protected bodyPartName: TValues<typeof EBodyParts>;
  protected exercisesInRoundLength: number;
  protected allExercisesData: IExercisesList = new ExercisesList();

  constructor(exercisesLength: number, bodyPartName: TValues<typeof EBodyParts>) {
    this.exercisesInRoundLength = exercisesLength;
    this.bodyPartName = bodyPartName;
    this.listOfExercisesForCurrentBodyPart = this.allExercisesData.getExercisesForBodyPart(bodyPartName);
  }

  public getExercisesList(props: IWorkoutGetExercisesListConfig): IExercise[] {
    return [];
  }

  public getListOfExercisesForCurrentBodyPart(): IExercise[] {
    return this.listOfExercisesForCurrentBodyPart;
  }

  protected getShuffledList(list: IExercise[]): IExercise[] {
    return [...list].sort(() => Math.random() - 0.5);
  }

  protected getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  protected getExerciseIndexInList(exercisesList: IExercise[], findId: string): number {
    return exercisesList.findIndex((el: IExercise, index: number) => {
      if (el.id === findId) return index;
    });
  }
}