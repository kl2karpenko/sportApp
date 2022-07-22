import IExercise from "../../models/Exercise/IExercise";
import { TValues } from "../../interfaces/TValues";
import { EBodyParts } from "../../data/bodyPartsForWorkout";
import { IExercisesList } from "../../models/ExercisesList/IExercisesList";
import ExercisesList from "../../models/ExercisesList/ExercisesList";

export default class WorkoutExercisesGeneratorService {
  protected listOfExercisesForCurrentBodyPart: Partial<IExercise>[];
  protected bodyPartName: TValues<typeof EBodyParts>;
  protected exercisesInRoundLength: number;
  protected allExercisesData: IExercisesList;
  protected memoizedShuffledCardioList: Partial<IExercise>[] = [];

  constructor(exercisesLength: number, bodyPartName: TValues<typeof EBodyParts>) {
    this.exercisesInRoundLength = exercisesLength;
    this.allExercisesData = new ExercisesList();
    this.bodyPartName = bodyPartName;
    this.listOfExercisesForCurrentBodyPart = this.allExercisesData.getExercisesForBodyPart(bodyPartName);
  }

  public getExercisesList(props: any): Partial<IExercise>[] {
    return [];
  }

  public getListOfExercisesForCurrentBodyPart(): Partial<IExercise>[] {
    return this.listOfExercisesForCurrentBodyPart;
  }

  protected getShuffledList(list: Partial<IExercise>[]): Partial<IExercise>[] {
    return [...list].sort(() => Math.random() - 0.5);
  }

  protected getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  protected getExerciseIndexInList(exercisesList: Partial<IExercise>[], findId: string): number {
    return exercisesList.findIndex((el: Partial<IExercise>, index: number) => {
      if (el.id === findId) return index;
    });
  }
}