import IExercise from "../Exercise/IExercise";
import { TValues } from "../../interfaces/TValues";
import { EBodyParts } from "../../data/bodyPartsForWorkout";

export default interface IRound {
  bodyId: TValues<typeof EBodyParts>;
  isActive: boolean;
  exercisesList: Partial<IExercise>[];
  restDuration: number;
  workDuration: number;

  getExercisesLength(): number;
  getExerciseByIndex(exIndex: number): Partial<IExercise>;
  updateExercises(exercises: Partial<IExercise>[]): void;
  updateExerciseByIndex(exIndex: number, exercise: Partial<IExercise>): void;
  updateBodyId(bodyPartName: TValues<typeof EBodyParts>): void;
}