import IExercise from "../../models/Exercise/IExercise";
import { TValues } from "../../interfaces/TValues";
import { EBodyParts } from "../../data/bodyPartsForWorkout";
import { IExercisesList } from "../../models/ExercisesList/IExercisesList";
import ExercisesList from "../../models/ExercisesList/ExercisesList";
import { TAllExercises } from "../../interfaces/TAllExercises";

export interface IWorkoutExercisesGeneratorServiceConfig {
  exercisesLength: number;
  bodyPartName: TValues<typeof EBodyParts>;
  exercises: TAllExercises;
  cardioExercises: Partial<IExercise>[];
}

export default class WorkoutExercisesGeneratorService {
  protected listOfExercisesForCurrentBodyPart: Partial<IExercise>[];
  protected bodyPartName: TValues<typeof EBodyParts>;
  protected exercisesInRoundLength: number;
  protected allExercisesData: IExercisesList;
  protected memoizedShuffledCardioList: Partial<IExercise>[] = [];

  constructor(props: IWorkoutExercisesGeneratorServiceConfig) {
    const { exercisesLength, bodyPartName, exercises, cardioExercises } = props;
    this.exercisesInRoundLength = exercisesLength;
    this.allExercisesData = new ExercisesList({ exercises, cardioExercises });
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