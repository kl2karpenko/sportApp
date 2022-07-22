import { TValues } from "../../interfaces/TValues";
import { EBodyParts } from "../../data/bodyPartsForWorkout";
import IExercise from "../Exercise/IExercise";

export interface IExercisesList {
  getExercisesList(): { [key in TValues<typeof EBodyParts>]: Partial<IExercise>[] };
  getExercisesListAsArray(): Partial<IExercise>[];
  getCardioExercisesList(): Partial<IExercise>[];
  getExercisesForBodyPart(bodyPartName: TValues<typeof EBodyParts>): Partial<IExercise>[];
  findExerciseById(exId: string): Partial<IExercise> | null;
  getRandomInt(min: number, max: number): number;
  getExerciseByIndex(index: number): Partial<IExercise>;
}