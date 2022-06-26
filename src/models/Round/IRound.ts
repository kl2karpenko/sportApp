import IExercise from "../Exercise/IExercise";
import { TValues } from "../../interfaces/TValues";
import { EBodyParts } from "../../data/bodyPartsForWorkout";

export default interface IRound {
  bodyId: TValues<typeof EBodyParts>;
  isActive: boolean;
  exercisesList: IExercise[];
  restDuration: number;
  workDuration: number;

  getExercisesLength(): number;
  getExerciseByIndex(exIndex: number): IExercise;
  updateExercises(exercises: IExercise[]): void;
  updateExerciseByIndex(exIndex: number, exercise: IExercise): void;
  updateBodyId(bodyPartName: TValues<typeof EBodyParts>): void;
}