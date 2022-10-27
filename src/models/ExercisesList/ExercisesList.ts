import { flatten } from "lodash-es";

import { TValues } from "../../interfaces/TValues";
import { EBodyParts } from "../../data/bodyPartsForWorkout";
import { IExercisesList } from "./IExercisesList";
import IExercise from "../Exercise/IExercise";
import { WorkoutType } from "../../interfaces/WorkoutType";
import { TAllExercises } from "../../interfaces/TAllExercises";

export interface IExercisesListProps {
  workoutType?: WorkoutType;
  exercises: TAllExercises;
  cardioExercises: Partial<IExercise>[];
}

export default class ExercisesList implements IExercisesList {
  private readonly exercisesList: TAllExercises;
  private readonly exercisesListAsArray: Partial<IExercise>[] = [];
  private readonly cardioExercisesList: Partial<IExercise>[] = [];

  constructor(props: IExercisesListProps) {
    const { cardioExercises } = props;
    this.exercisesList = props.exercises;
    this.cardioExercisesList = cardioExercises;
    this.exercisesListAsArray = flatten(Object.values(this.exercisesList).map((exercisesList: Partial<IExercise>[]) => exercisesList, []));
  }

  getExercisesList(): TAllExercises {
    return this.exercisesList;
  }

  getExercisesListAsArray(): Partial<IExercise>[] {
    return this.exercisesListAsArray;
  }

  getCardioExercisesList(): Partial<IExercise>[] {
    return this.cardioExercisesList;
  }

  getExercisesForBodyPart(bodyPartName: TValues<typeof EBodyParts>): Partial<IExercise>[] {
    return this.exercisesList[bodyPartName];
  }

  findExerciseById(exId: string): Partial<IExercise> | null {
    const findElement = this.exercisesListAsArray.find((ex: Partial<IExercise>) => exId === ex.id);

    if (findElement) {
      return findElement;
    }

    return null;
  }

  getExerciseByIndex(index: number): Partial<IExercise> {
    return this.exercisesListAsArray[index];
  }

  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}