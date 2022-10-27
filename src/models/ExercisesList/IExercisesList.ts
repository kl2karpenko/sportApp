import { TValues } from "../../interfaces/TValues";
import { EBodyParts } from "../../data/bodyPartsForWorkout";
import IExercise from "../Exercise/IExercise";
import { TAllExercises } from "../../interfaces/TAllExercises";

export interface IExercisesList {
  getExercisesList(): TAllExercises;
  getExercisesListAsArray(): Partial<IExercise>[];
  getCardioExercisesList(): Partial<IExercise>[];
  getExercisesForBodyPart(bodyPartName: TValues<typeof EBodyParts>): Partial<IExercise>[];
  findExerciseById(exId: string): Partial<IExercise> | null;
  getRandomInt(min: number, max: number): number;
  getExerciseByIndex(index: number): Partial<IExercise>;
}