import {TValues} from "../../interfaces_deprecated/TValues";
import {EBodyParts} from "../../data/bodyPartsForWorkout";
import IExercise from "../Exercise/IExercise";
import {IExercisesList} from "../ExercisesList/IExercisesList";
import ExercisesList from "../ExercisesList/ExercisesList";

export interface IWorkoutRoundExercises {
  listOfExercisesForCurrentBodyPart: IExercise[];
  bodyPartName: TValues<typeof EBodyParts>;
  exercisesInRoundLength: number;
  allExercisesData: IExercisesList;

  isExerciseCardio(exercise: IExercise): boolean;
  getAllExercises(): IExercisesList;
  getBodyPartId(): TValues<typeof EBodyParts>;
  getListOfExerciseForBodyId(): IExercise[];
  getNumberOfExercisesInRound(): number;
  getCardioExercisesList(): IExercise[];
}