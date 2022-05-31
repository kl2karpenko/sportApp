import IExercise from "../../models/Exercise/IExercise";
import {TValues} from "../../interfaces_deprecated/TValues";
import {BodyParts} from "../../data/bodyPartsForWorkout";
import {IRandomizerService} from "../RandomizerService/IRandomizerService";
import {WorkoutAlgorithms} from "./WorkoutAlgorithms";

export interface IWorkoutExercisesGeneratorService {
  exercisesList: { [key in TValues<typeof BodyParts>]: IExercise[] };
  cardioExercisesList: IExercise[];
  cardioExercisesListLength: number;
  randomizerService: IRandomizerService;
  listOfExercisesForCurrentBodyPart: IExercise[];
  allExercisesForThisBodyLen: number;

  getExercisesList(algorithm: WorkoutAlgorithms): Set<IExercise>;
  getExercise(exercisesList: Set<IExercise>, exclusive: boolean): IExercise;
  generateExclusiveExercise(exercisesList: Set<IExercise>): IExercise;
  getRandomExercise(): IExercise;
}