import IExercise from "../../models/Exercise/IExercise";
import {WorkoutAlgorithms} from "./WorkoutAlgorithms";
import {TValues} from "../../interfaces_deprecated/TValues";
import {BodyParts} from "../../data/bodyPartsForWorkout";
import {IRandomizerService} from "../RandomizerService/IRandomizerService";

export interface IWorkoutAlgorithmService {
  exercisesList: { [key in TValues<typeof BodyParts>]: IExercise[] };
  cardioExercisesList: IExercise[];
  cardioExercisesListLength: number;
  randomizerService: IRandomizerService;
  listOfExercisesForCurrentBodyPart: IExercise[];
  allExercisesForThisBodyLen: number;
  bodyPartName: TValues<typeof BodyParts>;
  exercisesLength: number;

  getExercisesList(algorithm: WorkoutAlgorithms, exercisesLength: number, bodyPartName: TValues<typeof BodyParts>): IExercise[];
}