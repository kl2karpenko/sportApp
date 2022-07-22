import { TValues } from "../../interfaces/TValues";
import { EBodyParts } from "../../data/bodyPartsForWorkout";
import { IExercisesList } from "./IExercisesList";
import IExercise from "../Exercise/IExercise";
import workoutTypes from "../../data/workoutTypesList";
import workoutTypesTabata from "../../data/workoutTypesList/tabata";
import workoutTypesHiit from "../../data/workoutTypesList/hiit";
import { flatten } from "lodash-es";
import { WorkoutType } from "../../interfaces/WorkoutType";

export interface IExercisesListProps {
  workoutType: WorkoutType
}

export default class ExercisesList implements IExercisesList {
  private readonly exercisesList: { [key in TValues<typeof EBodyParts>]: Partial<IExercise>[] } = {};
  private readonly exercisesListAsArray: Partial<IExercise>[] = [];
  private readonly cardioExercisesList: Partial<IExercise>[] = [];

  constructor(props: IExercisesListProps = { workoutType: WorkoutType.HIIT }) {
    switch (props.workoutType) {
    case WorkoutType.HIIT:
      this.exercisesList = workoutTypesHiit;
      break;
    case WorkoutType.Tabata:
      this.exercisesList = workoutTypesTabata;
      break;
    default:
      this.exercisesList = workoutTypes;
      break;
    }

    this.cardioExercisesList = this.getExercisesForBodyPart(EBodyParts.cardio);
    this.exercisesListAsArray = flatten(Object.values(this.exercisesList).map((exercisesList: Partial<IExercise>[]) => exercisesList, []));
  }

  getExercisesList(): { [key in TValues<typeof EBodyParts>]: Partial<IExercise>[] } {
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