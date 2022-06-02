import {TValues} from "../../interfaces_deprecated/TValues";
import {EBodyParts} from "../../data/bodyPartsForWorkout";
import IExercise from "../Exercise/IExercise";
import {IExercisesList} from "../ExercisesList/IExercisesList";

export interface IWorkoutRoundExercises {
  isExerciseCardio(exercise: IExercise): boolean;
  getAllExercises(): IExercisesList;
  getBodyPartId(): TValues<typeof EBodyParts>;
  getListOfExerciseForBodyId(): IExercise[];
  getNumberOfExercisesInRound(): number;
  getCardioExercisesList(): IExercise[];
}