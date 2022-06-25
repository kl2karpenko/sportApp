import { TValues } from "../../interfaces_deprecated/TValues";
import { EBodyParts } from "../../data/bodyPartsForWorkout";
import IExercise from "../Exercise/IExercise";

export interface IExercisesList {
  getExercisesList(): { [key in TValues<typeof EBodyParts>]: IExercise[] };
  getExercisesListAsArray(): IExercise[];
  getCardioExercisesList(): IExercise[];
  getExercisesForBodyPart(bodyPartName: TValues<typeof EBodyParts>): IExercise[];
  findExerciseById(exId: string): IExercise | null;
  getRandomInt(min: number, max: number): number;
  getExerciseByIndex(index: number): IExercise;
}