import { TValues } from "../../interfaces_deprecated/TValues";
import { EBodyParts } from "../../data/bodyPartsForWorkout";
import { IExercisesList } from "./IExercisesList";
import IExercise from "../Exercise/IExercise";
import workoutTypes from "../../data/workoutTypesList";
import { flatten } from "lodash-es";

export default class ExercisesList implements IExercisesList {
  private readonly exercisesList: { [key in TValues<typeof EBodyParts>]: IExercise[] } = workoutTypes;
  private readonly exercisesListAsArray: IExercise[] = [];
  private readonly cardioExercisesList: IExercise[] = this.getExercisesForBodyPart(EBodyParts.cardio);

  constructor() {
    this.exercisesListAsArray = flatten(Object.values(this.exercisesList).map((exercisesList: IExercise[]) => exercisesList, []));
  }

  getExercisesList(): { [key in TValues<typeof EBodyParts>]: IExercise[] } {
    return this.exercisesList;
  }

  getExercisesListAsArray(): IExercise[] {
    return this.exercisesListAsArray;
  }

  getCardioExercisesList(): IExercise[] {
    return this.cardioExercisesList;
  }

  getExercisesForBodyPart(bodyPartName: TValues<typeof EBodyParts>): IExercise[] {
    return this.exercisesList[bodyPartName];
  }

  findExerciseById(exId: string): IExercise | null {
    const findElement = this.exercisesListAsArray.find((ex: IExercise) => exId === ex.id);

    if (findElement) {
      return findElement;
    }

    return null;
  }
}